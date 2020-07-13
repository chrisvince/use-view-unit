import { useEffect, useState, useCallback } from 'react'

const DEFAULT_WINDOW_HEIGHT = typeof window !== 'undefined' && window.innerHeight
const DEFAULT_WINDOW_WIDTH = typeof window !== 'undefined' && window.innerWidth

const useViewUnit = () => {
	const [ windowHeight, setWindowHeight ] = useState(DEFAULT_WINDOW_HEIGHT)
	const [ windowWidth, setWindowWidth ] = useState(DEFAULT_WINDOW_WIDTH)

	const setWindowDimensions = event => {
		setWindowHeight(event.currentTarget.innerHeight)
		setWindowWidth(event.currentTarget.innerWidth)
	}

	useEffect(() => {
		typeof window !== 'undefined' && window.addEventListener('resize', setWindowDimensions)
		return () => typeof window !== 'undefined' && window.removeEventListener('resize', setWindowDimensions)
	}, [])

	const vh = useCallback(percent => {
		return denominatorPercent(percent, windowHeight)
	}, [windowHeight])

	const vw = useCallback(percent => {
		return denominatorPercent(percent, windowWidth)
	}, [windowWidth])

	const vmin = useCallback(percent => {
		if (windowHeight < windowWidth) {
			return vh(percent)
		}
		return vw(percent)
	}, [windowHeight, windowWidth])

	const vmax = useCallback(percent => {
		if (windowWidth < windowHeight) {
			return vh(percent)
		}
		return vw(percent)
	}, [windowHeight, windowWidth])

	const denominatorPercent = (percent, denominator) => {
		if (!percent) {
			return denominator
		}
		return denominator / 100 * percent
	}

	return {
		vh,
		vmax,
		vmin,
		vw,
	}
}

export default useViewUnit
