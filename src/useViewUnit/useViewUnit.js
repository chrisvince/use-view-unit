import { useEffect, useState, useCallback } from 'react'

const useViewUnit = () => {
	const [windowHeight, setWindowHeight] = useState(window.innerHeight)
	const [windowWidth, setWindowWidth] = useState(window.innerWidth)

	const setWindowDimensions = event => {
		setWindowHeight(event.currentTarget.innerHeight)
		setWindowWidth(event.currentTarget.innerWidth)
	}

	useEffect(() => {
		window.addEventListener('resize', setWindowDimensions)
		return () => window.removeEventListener('resize', setWindowDimensions)
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
