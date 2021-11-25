const arr = [1, 2, 3, 4, 5]

const dublArr = (arr) => {
    return [...arr, ...arr]
}

console.log(dublArr(arr))