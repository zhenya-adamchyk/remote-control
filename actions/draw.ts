import { RawData } from 'ws';
import robot from 'robotjs';

export const draw = (info: string) => {
    console.log(info.toString())
    const data = info.toString().split(' ');
    const widthAndRadius = +data[1];
    const figureLength = +data[2];
    let x = robot.getMousePos().x
    let y = robot.getMousePos().y
    switch (data[0]) {
        case 'draw_square': {
            for (let i = 0;i < widthAndRadius;i++) {
                robot.moveMouse(x + i, y)
                robot.mouseClick()
            }
            for (let i = 0;i < widthAndRadius;i++) {
                robot.moveMouse(x + widthAndRadius, y + i)
                robot.mouseClick()
            }
            for (let i = 0;i < widthAndRadius;i++) {
                robot.moveMouse(x + widthAndRadius - i, y + widthAndRadius)
                robot.mouseClick()
            }
            for (let i = 0;i < widthAndRadius;i++) {
                robot.moveMouse(x, y + widthAndRadius - i)
                robot.mouseClick()
            }
        }
        break
        case 'draw_circle': {
            const mousePos = robot.getMousePos()

            for (let i = 0; i <= Math.PI * 2; i += 0.01) {
                const x = mousePos.x + (widthAndRadius * Math.cos(i))
                const y = mousePos.y + (widthAndRadius * Math.sin(i))
                if (i > 0) robot.mouseClick()
                robot.moveMouse(x, y);
            }
        }
        break
        case 'draw_rectangle': {
            for (let i = 0;i < widthAndRadius;i++) {
                robot.moveMouse(x + i, y)
                robot.mouseClick()
            }
            for (let i = 0;i < figureLength;i++) {
                robot.moveMouse(robot.getMousePos().x, y + i)
                robot.mouseClick()
            }
            for (let i = 0;i < widthAndRadius;i++) {
                robot.moveMouse(x + widthAndRadius - i, robot.getMousePos().y)
                robot.mouseClick()
            }
            for (let i = 0;i < figureLength;i++) {
                robot.moveMouse(x, y + figureLength- i)
                robot.mouseClick()
            }
        }
        break
    }
}