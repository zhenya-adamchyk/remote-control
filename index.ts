import Jimp from 'jimp';
import { WebSocketServer } from 'ws';
import { draw } from './actions/draw';
import { move } from './actions/mouseMove';
import { screenShoot } from './actions/saveImg';
import robot from 'robotjs';
import { httpServer } from './src/http_server/index';
import { getMousePosition } from './actions/getMousePosition';

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const moveActions = ['mouse_up', 'mouse_down', 'mouse_left', 'mouse_right']
const drowActions = ['draw_rectangle', 'draw_circle', 'draw_square']
const wss = new WebSocketServer({port: 8080})


wss.on('connection', (ws) => {
        console.log('connected');
        ws.on('message', async (message) => {
            const messageString = message.toString()
            
            const isMoveAction = !!moveActions.find(action => action === messageString.split(' ')[0])
            const isDrawAction = !!drowActions.find(action => action === messageString.split(' ')[0])

            if (isMoveAction) {
                move(messageString)
                ws.send(messageString)
            } else if (isDrawAction) {
                draw(messageString)
                ws.send(messageString)
            } else if (messageString === 'prnt_scrn') {
                let base64 = await screenShoot()
                base64 = base64.replace('data:image/png;base64,', '')
                ws.send(`prnt_scrn ${base64}`)
            } else if (messageString === 'mouse_position') {
                const data = getMousePosition()
                ws.send(`mouse_position ${data[0]},${data[1]}`)
            }
            // 


            console.log('message', message.toString());

            });
    });
