import robot from 'robotjs'

export const getMousePosition = () => {
    return [robot.getMousePos().x, robot.getMousePos().y]
}