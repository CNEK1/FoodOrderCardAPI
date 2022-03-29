import express, { Request, Response } from 'express';
import * as Service from '/home/cnek/Desktop/FoodOrderCard/FoodOrderCardAPI/source/items/service';
import itemsFromDB from '../items/itemsFromDB';

const router = express.Router();

//Routes for data from created class 

router.get('/get', async (req: Request, res: Response) => {
    try {
        res.json({ burgers: await Service.AllOrders() });
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

router.get('/:id/order', async (req: Request, res: Response) => {
    var id: number = parseInt(req.params.id, 10);
    try {
        res.json({
            items: await Service.find(id),
            costOf: await Service.costOfOrder(id)
        });
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});
router.get('/costOfEvery', async (req: Request, res: Response) => {
    try {
        res.json({
            items: await Service.costOfOrders(),
            sumOf: await Service.sumOfAllBurgers()
        });
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});
// router.post("/", 
// body('_title').isString(),
// body('_cost').isNumeric(),
// async (req: Request, res: Response) => {
//     const errors = validationResult(req);
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors:errors.array()})
//     }
//     try {
//       const item: Burger = req.body;
  
//       const newItem = await Service.create(item);
  
//       res.status(201).json(newItem); 
//     } catch (e: any) {
//       res.status(500).send(e.message);
//     }
//   });
// router.get('/:order/:naming/Fav', async (req: Request, res: Response) => {
//     const order: number = parseInt(req.params.order, 10);
//     const naming: string = req.params.naming;
//     try {
//         const item: object = await Service.addToFav(order, naming);

//         if (item) {
//             return res.status(200).send(item);
//         }

//         res.status(404).send('item not found');
//     } catch (e: any) {
//         res.status(500).send(e.message);
//     }
// });
// router.get('/:order/:naming/:amount/inc', async (req: Request, res: Response) => {
//     const order: number = parseInt(req.params.order, 10);
//     const naming: string = req.params.naming;
//     const amount: number = parseInt(req.params.amount, 10);
//     try {
//         const item: object = {};
//         res.json(
//             {
//               item:await Service.increaseAmount(amount, order, naming)
//             }
//         )

//         if (item) {
//             return res.status(200).send(item);
//         }

//         res.status(404).send('item not found');
//     } catch (e: any) {
//         res.status(500).send(e.message);
//     }
// });
// router.get('/:order/:naming/:amount/dec', async (req: Request, res: Response) => {
//     const order: number = parseInt(req.params.order, 10);
//     const naming: string = req.params.naming;
//     const amount: number = parseInt(req.params.amount, 10);
//     try {
//         const item: object = {};
//         res.json(
//             {
//               item:await Service.decreaseAmount(amount, order, naming)
//             }
//         )

//         res.status(404).send('item not found');
//     } catch (e: any) {
//         res.status(500).send(e.message);
//     }
// });
// router.get('/sortLowToHigh', async (req: Request, res: Response) => {
//     try {
//         res.json({
//             items: await Service.sortOrdersLowToHigh()
//         });
//     } catch (e: any) {
//         res.status(500).send(e.message);
//     }
// });
// router.get('/sortHighToLow', async (req: Request, res: Response) => {
//     try {
//         res.json({
//             items: await Service.sortOrdersHighToLow()
//         });
//     } catch (e: any) {
//         res.status(500).send(e.message);
//     }
// });


//Routes for data from MongoDB 

router.get('/getAllfromDB',itemsFromDB.getALL)
router.post('/',itemsFromDB.createItem)

export = router;
