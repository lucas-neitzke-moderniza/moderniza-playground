import { useState, useLayoutEffect } from 'react'
/**
 * 
 * @returns {{width: Number, height: Number }}
 */
const DataviewDeviceSize = () => {
    const [size, setSize] = useState({})
    useLayoutEffect(() => {
        function updateSize() {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }
        window.addEventListener('resize', updateSize)
        updateSize()
        return () => window.removeEventListener('resize', updateSize)
    }, [])
    return size
}

export default DataviewDeviceSize