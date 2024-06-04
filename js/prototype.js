// filter, map, includes, indexOf, reduce, slice, splice

const array = [1, 2, 3];

// filter
Array.prototype.myFilter = function (cb) {
  const res = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) {
      res.push(this[i]);
    }
  }
  return res;
};
console.log(array.myFilter((item) => item !== 1));

// map

Array.prototype.myMap = function (cb) {
  const res = [];
  for (let i = 0; i < this.length; i++) {
    res.push(cb(this[i], i, this));
  }
  return res;
};

console.log(array.myMap((item) => item * 2));

//includes
Array.prototype.myIncludes = function (arg) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === arg) {
      return true;
    }
  }
  return false;
};

console.log(array.myIncludes(4));

//indexOf
Array.prototype.myIndexOf = function (arg) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === arg) {
      return i;
    }
  }
  return -1;
};

console.log(array.myIndexOf(4));

//reduce

Array.prototype.myReduce = function (cb, initialValue) {
  let acc = initialValue;
  if (this.length === 0 && initialValue === undefined) {
    throw new Error("empty array with no initial value");
  }
  let startIndex = 0;
  if (initialValue === undefined) {
    acc = this[0];
    startIndex = 1;
  }
  for (let i = startIndex; i < this.length; i++) {
    acc = cb(acc, this[i], i, this);
  }
  return acc;
};

console.log(array.myReduce((acc, cur, index) => acc + cur + index, 1));

//slice

Array.prototype.mySlice = function (startIndex, endIndex) {
  startIndex =
    startIndex === undefined
      ? undefined
      : startIndex >= 0
      ? startIndex
      : this.length + startIndex;
  endIndex =
    endIndex === undefined
      ? undefined
      : endIndex >= 0
      ? endIndex
      : this.length + endIndex;
  if (startIndex === undefined && endIndex === undefined) {
    return [...this];
  } else if (startIndex === undefined) {
    return this.myFilter((_, index) => index < endIndex);
  } else if (endIndex === undefined) {
    return this.myFilter((_, index) => index >= startIndex);
  } else if (startIndex < endIndex) {
    return this.myFilter(
      (item, index) => index >= startIndex && index < endIndex
    );
  } else {
    return [];
  }
};

console.log(array.slice(1, -4));
console.log(array.mySlice(1, 2));

//splice

Array.prototype.mySplice = function (startIndex, deleteCount, ...items) {
  startIndex =
    startIndex === undefined
      ? 0
      : startIndex < 0
      ? Math.max(this.length + startIndex, 0)
      : Math.min(startIndex, this.length - 1);
  deleteCount =
    deleteCount === undefined || this.length - startIndex < deleteCount
      ? this.length - startIndex
      : Math.max(deleteCount, 0);
  const res = [];
  if (deleteCount <= 0) {
    return res;
  } else {
    for (let i = startIndex; i < startIndex + deleteCount; i++) {
      res.push(this[i]);
    }
    let fast = startIndex + deleteCount;
    let slow = startIndex;
    while (fast < this.length) {
      this[slow] = this[fast];
      fast++;
      slow++;
    }
    while (this.length !== slow) {
      this.pop();
    }
  }
  return res;
};
const array2 = [1, 2, 3];
console.log(array2.splice(1, 1));
console.log(array.mySplice(1, 1));
console.log(array2);
console.log(array);
