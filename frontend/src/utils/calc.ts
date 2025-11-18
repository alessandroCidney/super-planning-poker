function reduceToFirstLap(degree: number)  {
  const laps = degree / 360

  return laps >= 1
    ? degree - 360 * Math.floor(laps)
    : degree
}

function calculateEquidistantPointDegrees(pieces: number, baseDegree: number) {
  const resultDegrees = [reduceToFirstLap(baseDegree)]

  let currentDegree = reduceToFirstLap(baseDegree)

  const step = 360 / pieces

  while (resultDegrees.length < pieces) {
    currentDegree = reduceToFirstLap(currentDegree + step)

    resultDegrees.push(currentDegree)
  }

  return resultDegrees
}

function toRadians(degree: number) {
  return degree * (Math.PI / 180)
}

// https://math.stackexchange.com/questions/22064/calculating-a-point-that-lies-on-an-ellipse-given-an-angle
function calculateEllipsePointCoordinateByDegree(ellipseA: number, ellipseB: number, degree: number) {
  function xSignal(degree: number) {
    return (degree >= 0 && degree <= 90 || degree >= 270 && degree <= 360)
      ? 1
      : -1
  }

  function ySignal(degree: number) {
    return (degree >= 0 && degree <= 180 || degree === 360)
      ? 1
      : -1
  }

  const x = xSignal(degree) * (ellipseA * ellipseB) / Math.sqrt(ellipseB ** 2 + ellipseA ** 2 * Math.tan(toRadians(degree)) ** 2)

  const y = ySignal(degree) * Math.abs(x * Math.tan(toRadians(degree)))

  return {
    x: Math.round(x),
    y: Math.round(y),
    degree,
  }
}

export interface EllipseCoordinate {
  x: number
  y: number
  degree: number
}

export function calculateEllipseEquidistantPointsCoordinates(
  ellipseWidth: number,
  ellipseHeight: number,
  pieces: number,
  baseDegree: number,
): EllipseCoordinate[] {
  const degressArr = calculateEquidistantPointDegrees(pieces, baseDegree)

  const coordinatesArr = degressArr.map(degree => calculateEllipsePointCoordinateByDegree(ellipseWidth / 2, ellipseHeight / 2, degree))

  return coordinatesArr
}

export function generateQuadraticEquation(a: number, b: number, c: number) {
  return (x: number) => a * x ** 2 + b * x + c
}