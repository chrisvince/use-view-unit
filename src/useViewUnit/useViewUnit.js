import { useEffect, useState } from 'react'

const useViewUnit = () => {
	const [height, setHeight] = useState(window.innerHeight)
	const [width, setWidth] = useState(window.innerWidth)

	const setWindowDimensions = event => {
		setHeight(event.currentTarget.innerHeight)
		setWidth(event.currentTarget.innerWidth)
	}

	useEffect(() => {
		window.addEventListener('resize', setWindowDimensions)
		return () => window.removeEventListener('resize', setWindowDimensions)
	}, [])

	const vh = percent => {
		return denominatorPercent(percent, height)
	}

	const vw = percent => {
		return denominatorPercent(percent, width)
	}

	const vmin = percent => {
		if (height < width) {
			return vh(percent)
		}
		return vw(percent)
	}

	const vmax = percent => {
		if (width < height) {
			return vh(percent)
		}
		return vw(percent)
	}

	const denominatorPercent = (percent, denominator) => {
		if (!percent) {
			return denominator
		}
		return denominator / 100 * percent
	}

	return {
		vh,
		vw,
		vmin,
		vmax
	}
}

export default useViewUnit
