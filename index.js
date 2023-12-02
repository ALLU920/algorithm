let randomize_array = document.getElementById("ra");
let bubble_sort = document.getElementById("bs");
let insertion_sort = document.getElementById("is");
let quick_sort = document.getElementById("qs");
let merge_sort = document.getElementById("#ms");
let bars_container = document.getElementById("bars_container");
let minRange = 1;
let maxRange = 100;
//slider
let arraySize = document.querySelector('#arr_sz');
let speed = document.querySelector("#speed_input");
let numofbars = parseInt(arraySize.value);
let heightFactor = 4.5;
let unsorted_array = new Array(numofbars);




//Random number function

function randomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


//creating the random array

function createRandomArray() {
    let array = new Array(numofbars);
    for (let i = 0; i < numofbars; i++) {
        array[i] = randomNum(minRange, maxRange);
    }
    return array;

}
//delete array



//bars

document.addEventListener("DOMContentLoaded", function () {
    createRandomArray();
    renderBars(unsorted_array);
});


function renderBars(array) {
    for (let i = 0; i < array.length; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = array[i] * heightFactor + "px";
        bars_container.appendChild(bar);
    }


}


//event listener for the randomize array button

randomize_array.addEventListener("click", function () {
    numofbars = parseInt(arraySize.value);
    unsorted_array = createRandomArray();
    bars_container.innerHTML = "";
    renderBars(unsorted_array);
});

//
let delayElement = document.querySelector('#speed_input');
delayElement.addEventListener('input', function () {
    console.log(delayElement.value, typeof (delayElement.value));
    delay = 51 - parseInt(delayElement.value);

});


//sleep function to add delay for animation]
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}


// Bubble Sort Function

async function bubbleSort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                for (let k = 0; k < bars.length; k++) {
                    if (k !== j && k !== j + 1) {
                        bars[k].style.backgroundColor = "aqua";

                    }
                }
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                //bar animation
                bars[j].style.height = array[j] * heightFactor + "px";
                bars[j].style.backgroundColor = "lightgreen";
                //bars[j].innertext = array[j];
                bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
                bars[j + 1].style.backgroundColor = "lightgreen";
                //bars[j+1].innertext = array[j+1];
                await sleep(delay);

            }
        }
        await sleep(delay);
    }
    return array;
}

//insertion sort function



//button event listener

bubble_sort.addEventListener("click", function () {
    let sorted_array = bubbleSort(unsorted_array);
    console.log(sorted_array);
});





//insertion sort


async function swap(items, leftIndex, rightIndex, bars) {
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
    bars[leftIndex].style.height = items[leftIndex] * heightFactor + "px";
    bars[leftIndex].style.backgroundColor = "lightgreen";
    //bars[leftIndex].innerText = items[leftIndex];
    bars[rightIndex].style.height = items[rightIndex] * heightFactor + "px";
    bars[rightIndex].style.backgroundColor = "lightgreen";
    //bars[rightIndex].innerText = items[rightIndex];
    await sleep(delay);
}



async function partition(items, left, right) {
    let bars = document.getElementsByClassName("bar");
    let pivotIndex = Math.floor((right + left) / 2);
    var pivot = items[pivotIndex]; //middle element
    bars[pivotIndex].style.backgroundColor = "red";

    for (let i = 0; i < bars.length; i++) {
        if (i != pivotIndex) {
            bars[i].style.backgroundColor = "aqua";
        }
    }

    (i = left), //left pointer
        (j = right); //right pointer
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            await swap(items, i, j, bars); //sawpping two elements
            i++;
            j--;
        }
    }
    return i;
}



async function quickSort(items, left, right) {
    var index;
    let bars = document.getElementsByClassName("bar");
    if (items.length > 1) {
        index = await partition(items, left, right); //index returned from partition
        if (left < index - 1) {
            //more elements on the left side of the pivot
            await quickSort(items, left, index - 1);
        }
        if (index < right) {
            //more elements on the right side of the pivot
            await quickSort(items, index, right);
        }
    }

    for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = "aqua";
    }
    return items;
}

quick_sort.addEventListener("click", function () {
    let sorted_array = quickSort(unsorted_array, 0, unsorted_array.length - 1);
    console.log(sorted_array);
});




async function InsertionSort(array) {
    let bars = document.getElementsByClassName("bar");
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
            bars[j + 1].style.backgroundColor = "red";
            //bars[j + 1].innerText = array[j + 1];
            await sleep(delay);

            for (let k = 0; k < bars.length; k++) {
                if (k != j + 1) {
                    bars[k].style.backgroundColor = "aqua";
                }
            }
            j = j - 1;
        }
        array[j + 1] = key;
        bars[j + 1].style.height = array[j + 1] * heightFactor + "px";
        bars[j + 1].style.backgroundColor = "lightgreen";
        //bars[j + 1].innerText = array[j + 1];
        await sleep(delay);
    }

    for (let k = 0; k < bars.length; k++) {
        bars[k].style.backgroundColor = "aqua";
    }
    return array;
}

insertion_sort.addEventListener("click", function () {
    let sorted_array = InsertionSort(unsorted_array);
    console.log(sorted_array);
});



async function mergeSort(arr) {
    let bars = document.getElementsByClassName("bar");
    if (arr.length < 2) {
        return arr;
    }
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    let actualHalf = await mergeSort(left);
    await mergeSort(right);

    let i = 0;
    let j = 0;
    let k = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            arr[k] = left[i];
            i++;

        } else {
            arr[k] = right[j];
            j++;


            //visualize it for right and left side
            bars[k].style.height = arr[k] * heightFactor + "px";
            bars[k].style.backgroundColor = "lightgreen";
            if (k + arr.length < bars.length) {
                bars[k + arr.length].style.height = arr[k] * heightFactor + "px";
                console.log(arr[k] * heightFactor);
                bars[k + arr.length].style.backgroundColor = "yellow";
            }
            await sleep(delay);
            //bars[k].innerText = arr[k];

            k++;
        }

        while (i < left.length) {
            arr[k] = left[i];
            bars[k].style.height = arr[k] * heightFactor + "px";
            bars[k].style.backgroundColor = "lightgreen";
            await sleep(delay);
            i++;
            k++;
        }

        while (j < right.length) {
            arr[k] = right[j];
            bars[k].style.height = arr[k] * heightFactor + "px";
            bars[k].style.backgroundColor = "lightgreen";
            await sleep(delay);
            j++;
            k++;
        }


        for (let k = 0; k < bars.length; k++) {
            bars[k].style.backgroundColor = "aqua";
        }

        return arr;
    }

    function mergeSortD(arr, start, end) {
        if (arr.length < 2) {
            return arr;
        }

        let middle = Math.floor((start + end) / 2);
        let left = arr.slice(start, middle);
        let right = arr.slice(middle, end);

        //mergeSort(left);
        mergeSort(right);
    }

    merge_sort.addEventListener("click", function () {
        console.log("clicked");
        let sorted_array = mergeSort(unsorted_array);
        console.log(sorted_array);
    });


}