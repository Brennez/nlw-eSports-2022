import express, { json, query } from "express";
import cors from "cors";
import {PrismaClient} from '@prisma/client';
import {convertHourStringToMinutes}  from './utils/convert-hours-string-to-minutes'
import { convertMinutesToHours } from "./utils/convert-minutes-to-hours";


const app = express();

app.use(cors());

app.use(json());

app.use(express.json());

const prisma = new PrismaClient({
    log: ['query']
}); 

// Lista todos os games com os anúncios
app.get('/games', async (request, response) => {
    var games = await prisma.game.findMany({
        // vai incluir os anúncios para cada jogo
        include: {
            _count: {
                select: {
                    ads: true,
                }
            }
        }
    },);
    return response.status(200).json(games);
})

// Cria um anúncio
app.post('/games/:id/ads', async (request, response) => {
    const gameId = request.params.id;
    const body: any = request.body;
    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            weekDays: body.weekDays.join(','),
            hoursStart: convertHourStringToMinutes(body.hoursStart),
            hoursEnd: convertHourStringToMinutes(body.hoursEnd),
            useVoiceChannel: body.useVoiceChannel,
        }
    })

   

    return response.status(201).json(ad);
}); 

// Cconcatenação de recursos p/ pegar todos os anúncios de um game específico
app.get('/games/:id/ads', async (request, response)=>{

    const id = request.params.id;
    const ads = await prisma.ad.findMany({
        select:{
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hoursStart: true,
            hoursEnd: true,
        },
        where: {
            gameId: id
        },
        orderBy: {
            createdAt: 'desc'
        },

    })
    return response.json(ads.map(ad =>{
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hoursStart: convertMinutesToHours(ad.hoursStart),
            hoursEnd: convertMinutesToHours(ad.hoursEnd),
        }
    }))
})

// Pegar o discord de um anúncio específico
app.get('/ads/:id/discord', async (request, response)=>{
    const adId  = request.params.id;
    const ad = await prisma.ad.findUniqueOrThrow({
        select:{
            discord: true,
        },
        where: {
            id: adId,
        },
        


    }) 
    return response.status(200).json({
        discord: ad.discord,
    });
})

app.listen(3000);