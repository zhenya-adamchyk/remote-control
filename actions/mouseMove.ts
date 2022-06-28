import robot from 'robotjs';

export const move = (info: string) => {
    const data = info.toString().split(' ');
    const moveLength = +data[1]
    let x = robot.getMousePos().x
    let y = robot.getMousePos().y
    switch (data[0]) {
        case 'mouse_up': {
            robot.moveMouse(x, y - moveLength)
        }
        break
        case 'mouse_down': {
            robot.moveMouse(x, y + moveLength)
        }
        break
        case 'mouse_left': {
            robot.moveMouse(x - moveLength, y)
        }
        break
        case 'mouse_right': {
            robot.moveMouse(x + moveLength, y)
        }
        break
    }
}