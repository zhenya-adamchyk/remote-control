import robot from 'robotjs'
import Jimp from 'jimp'

export const screenShoot = () => {
    let x = robot.getMousePos().x
    let y = robot.getMousePos().y
    const pic = robot.screen.capture(x, y, 200, 200)
    const width = pic.byteWidth / pic.bytesPerPixel // pic.width is sometimes wrong!
    const height = pic.height
    const image = new Jimp(width, height)
    let red: number, green: number, blue: number
    pic.image.forEach((byte: number, i: number) => {
        switch (i % 4) {
        case 0: return blue = byte
        case 1: return green = byte
        case 2: return red = byte
        case 3: 
            image.bitmap.data[i - 3] = red
            image.bitmap.data[i - 2] = green
            image.bitmap.data[i - 1] = blue
            image.bitmap.data[i] = 255
        }
    })

    return image.getBase64Async(image.getMIME())
}