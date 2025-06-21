export const checkForColision = (head, snake) => {
  // Check for wall Collision
  if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
    return true;
  }
  //Check   Self collision
  for (let i = 1; i < snake.length; i++) {
    if (head[0] === snake[i][0] && head[1] === snake[i][1]) {
      return true;
    }
  }
  return false;
};

export const growSnake = (newSnake, setSnake) => {
  const newSegment = [...newSnake[0]];
  newSnake.unshift(newSegment);
  setSnake(newSnake);
};
export const getRandomCoordinates = (snake) => {
  const min = 1;
  const max = 98;
  let x, y;
  let valid = false;

  while (!valid) {
    x = Math.floor((Math.random() * (max - min) + min) / 2) * 2;
    y = Math.floor((Math.random() * (max - min) + min) / 2) * 2;

    // Check that new food is NOT on any snake part
    valid = !snake.some((segment) => segment[0] === x && segment[1] === y);
  }
  console.log(x, y);

  return [x, y];
};
