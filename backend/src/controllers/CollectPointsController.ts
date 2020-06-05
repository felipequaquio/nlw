import { Request, Response } from 'express'
import knex from '../database/connection';

class CollectPointsController {
    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;
        
        const parsed_items = String(items)
            .split(',')
            .map(item => Number(item.trim()));
        
        const collect_points = await knex('collect_points')
            .join('collect_point_items', 'collect_points.id', '=', 'collect_point_items.collect_point_id')
            .whereIn('collect_point_items.item_id', parsed_items)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('collect_points.*');
        
        return response.json(collect_points)
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const collect_point = await knex('collect_points').where('id', id).first();

        if(!collect_point) {
            return response.status(400).json({ message: 'Collect point not found.' });
        }

        const items = await knex('items')
            .join('collect_point_items', 'collect_point_items.item_id', '=', 'items.id')
            .where('collect_point_items.collect_point_id', id)
            .select('items.title');

        return response.json({ collect_point, items });
    }

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            items
        } = request.body;
    
        const collect_point = {
            image: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        };

        const trx = await knex.transaction();

        const inserted_ids = await trx('collect_points').insert(collect_point);
    
        const collect_point_id = inserted_ids[0];
    
        const collect_point_items = items.map((item_id: number) => {
            return {
                item_id,
                collect_point_id
            }
        });
    
        await trx('collect_point_items').insert(collect_point_items);
        
        await trx.commit();
        
        return response.json({ 
            id: collect_point_id,
            ...collect_point 
        });
    }
}

export default CollectPointsController;