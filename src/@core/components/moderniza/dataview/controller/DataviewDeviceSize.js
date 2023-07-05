import { useState, useLayoutEffect } from 'react'
/**
 * Get device demensions
 * @returns {{width: Number, height: Number }}
 */
const DataviewDeviceSize = () => {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })
    useLayoutEffect(() => {
        const updateSize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        window.addEventListener('resize', updateSize)
        return () => {
            window.removeEventListener('resize', updateSize)
        }
    }, [])
    return size
}

export default DataviewDeviceSize