function ComputeCalcul(strIndex, strCalcul) {
  
  try {

    // we'll do the operations as follow:
    // we'll store a number, then the following operator, then the following number,
    // and then compute those data

    // since there is priorities, we'll do priority passes, from higher to lower
    for (let priority = 0; priority < priorities.length; priority++) {

      // create the vars
      let firstNumberData = null;
      let secondNumberData = null;

      // operator is used to store any operator we come across
      let operator = null;
      // currentPriorityOperator is used to store an operator of the current priority
      let currentPriorityOperator = null;
      // those are used to store the operators that only requires one value, like the factorial '!'
      let prefixOperator = null;
      let postfixOperator = null;

      // we do this to keep the initial strIndex in memory
      let index = strIndex;

      while (index < strCalcul.length) {

        // cache the current char
        const c = strCalcul[index];

        // trying to parse a number
        let numberData = tryParseNumber(index, strCalcul, currentPriorityOperator);

        // means we didn't find any number
        if (numberData == false) {

          // check first for the prefix operators as they only requires one value and come before it
          // and check if we are at the right priority pass for this operator
          if (isPrefixOperator(c) && priorities[priority].operations[c] != undefined) {
            prefixOperator = c;
            index++;
          }

          // checking if the symbol is an operator
          else if (isSupportedOperator(c)) {

            operator = c;

            // check for extra currentPriorityOperator
            if (currentPriorityOperator != null)
              throw new Error("Invalid synthax: extra operator '" + c + "' found at index " + `${index} in "${strCalcul}"`);
  
            // checking if it's an operation of the current priority
            // and if so setting operator to it's value
            if (priorities[priority].operations[c] != undefined)
              currentPriorityOperator = c;

            index++;
          }

          // checking if we came across a parenthese
          else if (c == '(') {
            // storing the parenthese index
            const openingParentheseIndex = index;

            // since everything inside a parenthese is to be computed before everything outside,
            // it's basically a separated calcul, so we compute it recursively, starting from just after the parenthese
            // it's gonna return the result of the calcul contained inside the parenthese, nothing more
            const parentheseResult = ComputeCalcul(index + 1, strCalcul);

            // since every parentheses inside this one is gonna be computed recursively,
            // we just need to go to the closing parenthese matching the current one

            // for that, we need to keep track of the scope,
            // to not return at the first closing parenthese if we came across several opening ones
            // ex: (()
            let parentheseScope = 0;

            do {
              // in this case, we go deeper in the parenthese scope
              if (strCalcul[index] == '(')
                parentheseScope++;
              
              // in this case, we go up in the scope
              if (strCalcul[index] == ')')
                parentheseScope--;
              index++;

              // if the parentheseScope == 0, it means we reached the closing parenthese of the first one
            } while (parentheseScope > 0 && index < strCalcul.length);

            // replacing this part by it's result
            const updatedStringData = updateString(openingParentheseIndex, index - 1, strCalcul, parentheseResult.number);

            // setting the data
            strCalcul = updatedStringData.newString;
            index = updatedStringData.endOfUpdateIndex;

            numberData = {
              number: parentheseResult.number,
              startIndex: openingParentheseIndex,
              endIndex: updatedStringData.endOfUpdateIndex - 1
            };
      
          }
          // if we come across a closing parenthese here,
          // it means we currently are in a recursive call of this function,
          // computing the inside of a parenthese
          // so we break of this loop to continue the possible remaining priority passes before returning
          else if (c == ')')
            break;
          
          // if we arrive here, it means that what we found
          // was not a number, nor an operator, nor a parenthese
          // it's an invalid synthax
          else
            throw new Error("Invalid synthax: " + `'${c}' found at index ${index} in "${strCalcul}"`);
        }
        else
          index = numberData.endIndex + 1;

        // recheck if we still didn't found a number
        if (numberData != false) {

          // checking for a postfix operator
          if (index < strCalcul.length) {

            // cache the tested char
            const c = strCalcul[index];

            // if we find a postfix operator, store it
            if (isPostfixOperator(c) && priorities[priority].operations[c] != undefined)
              postfixOperator = c
              
          }

          // computing prefix operator if there is
          if (prefixOperator) {
            numberData.number = priorities[priority].operations[prefixOperator](numberData.number);

            // including it the part to replace
            numberData.startIndex--;
          }
            

          // computing postfix operator if there is
          if (postfixOperator) {
            numberData.number = priorities[priority].operations[postfixOperator](numberData.number);

            // including it to te part to replace
            numberData.endIndex++;
          }

          // if there was they are now computed and must be removed of the calcul
          if (prefixOperator || postfixOperator) {

            // replacing the number and operator(s) to only the number
            const updatedStringData = updateString(numberData.startIndex, numberData.endIndex, strCalcul, numberData.number);

            // setting the data
            strCalcul = updatedStringData.newString;
            index = updatedStringData.endOfUpdateIndex;

            // reseting thoses operators
            postfixOperator = null;
            prefixOperator = null;
          }

          // if this condition is true, it means that there is already a firstNumber
          // and that we found a second one stored in numberData,
          // but we never found any operator between
          if (firstNumberData && !operator)
            throw new Error("Missing operator at index " + (firstNumberData.endIndex + 1) + ` in "${strCalcul}"`);

          // storing it in the right variable
          // if there is no firstNumber, storing it there
          // or if there is no currentPriorityOperator
          // because it means that the previously stored number in firstNumberData
          // if for a calcul of lower priority than the current
          if (!firstNumberData || !currentPriorityOperator) firstNumberData = numberData;
          // we store it in the second only if there is a firstNumber and an operator
          else secondNumberData = numberData;

        }

        // checking if we have all the required data to do the maths
        if (firstNumberData && secondNumberData) {

          // check is there is a valid currentPriorityOperator
          if (currentPriorityOperator == null)
            throw new Error("Missing operator at index " + (firstNumberData.endIndex + 1) + ` in "${strCalcul}"`);

          // doing the calcul
          const result = priorities[priority].operations[currentPriorityOperator](firstNumberData.number, secondNumberData.number);

          // updating the strCalcul by replacing the 2 numbers and the operator to only the result
          const updatedStringData = updateString(firstNumberData.startIndex, secondNumberData.endIndex, strCalcul, result);

          // setting the data
          strCalcul = updatedStringData.newString;
          index = updatedStringData.endOfUpdateIndex;

          // we know that there is a number here,
          // and we have all the required data to store it
          firstNumberData = {
            number: result,
            startIndex: firstNumberData.startIndex,
            endIndex: updatedStringData.endOfUpdateIndex
          };

          secondNumberData = null;
          currentPriorityOperator = null;
        }
      }
    }

    // returning the only value that remains
    return tryParseNumber(strIndex, strCalcul, null);
  
  // catch exception if any
  // this should only be your custom Errors
  // if you checked the potentials errors correctly
  } catch (exception) {
    console.log(`\n${exception}\n`);
    process.exit();
  }

}

// priority 0 operation functions
function ft_power(a, b) {
  return a ** b;
}

function ft_sqrt(a) {
        
  let value = 0;

  // while value is too small to be a's sqrt,
  // keep incrementing it
  while (value * value < a)
    value++;

  // check if it's exactly the sqrt
  if (value * value == a)
    return value;
  
  // else it means the true sqrt is between value - 1 & value
  // so let's decrementing it from 1 and trying to find the exact value
  // by incrementing the decimal part, up to a precision of .00001
  value--;

  let precisionIncrement = 0.1;
  for (let precision = 0; precision < 5; precision++) {
    // adding the current precision increment
    // to try to get as close as possible of the true sqrt value
    while (value * value <= a)
      value += precisionIncrement;
    
    // if we have reached it, return it
    if (value * value == a)
      return value;
    
    // else we are too far, the true value is between value - precisionIncrement & value
    // so let's remove the exceedent
    value -= precisionIncrement;
    // and go the next precision level
    precisionIncrement /= 10;
  }

  // we are as close to the true sqrt as we have allowed to be
  // returning the found val
  return value;
  
}

function ft_factorial(a) {

  // we can't compute factorial of negative number
  if (a < 0)
    throw new Error("The value must be positive to calcul it's factorial.");

  // factorial of floating number is called and computed differently
  if (!isNumberInteger(a))
    throw new Error("The value must be an integer to calcul it's factorial.");

  // 0! is equal to 1
  if (a == 0)
    return 1;

  let factorial = a;

  while (a > 1) {
    factorial *= a - 1;
    a--;
  }

  return factorial;
}

// some utility functions

// check if the next chars represents a number, and if so returns it
function tryParseNumber(start, strCalcul, operator) {

  let i = start;
  let isSigned = false;
  let sign = 1;

  // check if there is a sign '-' or '+'
  if (i < strCalcul.length) {

    // if we find an operator while this is not the first char of the calcul
    // and there is still no found operator in the main calcul
    // that means this sign is not part of the number but is an operator
    if (
      (strCalcul[i] == '+' || strCalcul[i] == '-') && // if we find an operator
      !operator &&                                    // and there no found operator yet
      start != 0 &&                                   // and it is not the first char of a calcul
      strCalcul[start - 1] != '('                     // and the previous char is not a '(', which makes it the first char of a calcul for the recursive
    )
      return false;
  
    // if true, skip it because it's positive by default
    if (strCalcul[i] == '+') {
      isSigned = true;
      i++;
    }

    // if true, set sign to -1
    else if (strCalcul[i] == '-') {
      isSigned = true;
      sign = -1;
      i++;
    }
  }

  let result = null;

  while (i < strCalcul.length) {
    // test if char is digit
    const digit = isCharADigit(strCalcul[i]);

    // if it's a digit, use it to build the result
    if (digit !== false) {

      // this security is just to remember if we found something
      if (result == null)
        result = 0;

      result = result * 10 + digit;
    }
    // else we're not in a integer anymore
    else
      break;
    
    i++;
  }

  // check if it's a floating number
  if (i < strCalcul.length && (strCalcul[i] == ',' || strCalcul[i] == '.')) {
    // skipping the floating symbol
    i++;

    // we're gonna parse the floating number by dividing them by their precision level
    // then adding them to the result
    let precisionLevel = 1;
  
    while (i < strCalcul.length) {
      // test if char is digit
      const digit = isCharADigit(strCalcul[i]);
  
      // if it's a digit, use it to build the result
      if (digit !== false) {

        // this security is just to remember if we found something
        if (result == null)
          result = 0;
        
        result += digit / (10 ** precisionLevel);
      }
        
      // else we're not in a integer anymore
      else
        break;

      i++;
      precisionLevel++;
    }
  }

  // checking if we parsed a number,
  // or if it wasn't one
  if (i == start) // means we found nothing
    return false;
  else if (i == start + 1 && isSigned == true) // means we only found a + or -, probably as operators
    return false
  else if (i != start && result == null) // the only way for that to be true is to have found only a floating symbol, which cannot be valid
    throw new Error("Invalid syntax: " + `'${strCalcul[start]}' found at index: ${start} in "${strCalcul}"`);

  // that means we have a number, so returning an object
  // that contains it multiplied by it's sign,
  // and it's start and end indexes to know from where to where to replace in the string later
  return {
    number: result * sign,
    startIndex: start,
    endIndex: i - 1
  };

}

// update the string by replacing the part between the 2 indexes by the provided part
// returns an object containing the new string and the index where it ended to include the new part
function updateString(start, end, actualStr, newPart) {

  // checking that every provided data matches one another to prevent errors 
  if (end >= actualStr.length)
    throw new Error("Out of string bounds at updateString()");
  if (start > end)
    throw new Error("Wrong start/end values at updateString(): " + `${start}/${end}`);
  if (start < 0)
    throw new Error("Negative start index at updateString()");

  // cast newPart as a string in case it's not already
  let strNewPart = `${newPart}`;

  // the variable that will contain the new updated string
  let newString = "";
  // the global loop index
  let i = 0;

  // to store the index where we stopped to include the newPart
  let endOfUpdateIndex = 0;

  while (i < actualStr.length) {
    // for now it's just copying the actual string
    if (i < start)
      newString += actualStr[i];

    // now we start adding the new part
    if (i >= start && i <= end) {

      let j;
      for (j = 0; j < strNewPart.length; j++)
        newString += strNewPart[j];

      // setting the endOfUpdateIndex
      endOfUpdateIndex = i + j;
      
      // setting the index as equal to end to keep it synced with actualStr
      i = end;
    }

    // copying again actualStr
    else if (i > end)
      newString += actualStr[i];
      
    i++;
  }

  if (_options.steps !== false) {
    console.log(`${_options.steps}: ${newString}`);
    _options.steps++;
  }

  return {
    newString,
    endOfUpdateIndex
  };
}

// check if value is float or integer
function isNumberInteger(nbr) {
  return nbr % 1 === 0;
}

// check if a char represents a digit
// do not forget to check it's result with a strict equality symbol (===),
// as (0 == false) returns true, but (0 === false) returns false, which we want
function isCharADigit(c) {

  let result = false;

  // check every possible digit,
  // and set the result to it's numerical value if it matches
  switch (c) {
    case '0':
      result = 0;
      break;
    case '1':
      result = 1
      break;
    case '2':
      result = 2;
      break;
    case '3':
      result = 3;
      break;
    case '4':
      result = 4;
      break
    case '5':
      result = 5;
      break;
    case '6':
      result = 6;
      break;
    case '7':
      result = 7;
      break;
    case '8':
      result = 8;
      break;
    case '9':
      result = 9;
      break;
  }

  // if the char wasn't a digit, false is returned
  return result;
}

// check if the requested operator is in the list of those supported
function isSupportedOperator(operator) {
  for (let i = 0; i < priorities.length; i++) {

    // check if there is an associated function in each row of priority
    if (priorities[i].operations[operator] != undefined)
      return true;
  
  }
  
  return false;
}

// check if the requested operator is in the corresponding list
function isPrefixOperator(operator) {
  for (let i = 0; i < prefixOperators.length; i++) {

    if (prefixOperators[i] == operator)
      return true;
  
  }
  
  return false;
}

// check if the requested operator is in the corresponding list
function isPostfixOperator(operator) {
  for (let i = 0; i < prefixOperators.length; i++) {

    if (postfixOperators[i] == operator)
      return true;
  
  }
  
  return false;
}

/* ================== START OF THE PROGRAM ================ */

// setting up the options
const _options = {
  steps: false
};

// loop through the args to get te options
for (let argsIndex = 2; argsIndex < process.argv.length - 1; argsIndex++) {

  // check for specific options
  if (process.argv[argsIndex] == "-s")
    _options.steps = 1;

}

// first get the calcul we have to resolve
const calculToCompute =
  process.argv.length >= 3 ?                  // check if it's in the args (the 2 firsts args are node path and current file path)
    process.argv[process.argv.length - 1] :     // if so use it, it should be the last as options comme first
    "";                                         // else set it to a default calcul

// right away, return if the calcul is empty
if (calculToCompute.length == 0) {

  // prints the supported operators
  console.log("\nSupported operators: ['+', '-', '*', '/', '%', '!', '^', '√'].");
  console.log("Parentheses are supported.");

  // prints usage and options
  console.log("\nUsage: node calculator.js <options> \"<calcul>\"");
  console.log("Options:");
  console.log("\t-s to see the calcul steps\n");

  console.log("Empty calcul.\n");

  return;
}

// storing the prefix and postfix operators to recognize them later
const postfixOperators = ['!'];
const prefixOperators = ['√'];

// setting the possible operations by their priority based on PEMDAS
// (parentheses are always top priority, they are dealt with recursively)
const priorities = [
  { // priority 0
    operations: {
      '^': ft_power,
      '√': ft_sqrt,
      '!': ft_factorial
    }
  },
  { // priority 1
    operations: {
      '%': (a, b) => { return a % b; }, // modulo
      '*': (a, b) => { return a * b; }, // multiplication
      '/': (a, b) => {                  // division
        // check for division by zero
        if (b == 0)
          throw new Error("Division by 0.");
        
        return a / b;
      }
    }
  },
  { // priority 2
    operations: {
      '+': (a, b) => { return a + b; }, // addition
      '-': (a, b) => { return a - b; }  // soustraction
    }
  }
]

// creating a copy of the calcul without any white spaces in it
let cleanCalculToCompute = "";

// copying only not white spaces char
for(let i = 0; i < calculToCompute.length; i++) {

  // caching the current char
  const c = calculToCompute[i];

  // checking for space, tab, new line and carriage return
  if (c != ' ' && c != '\t' && c != '\n' && c != '\c')
    cleanCalculToCompute += c;
  
}

// printing the base calcul if the steps option is on
if (_options.steps !== false)
  console.log(`\n0: ${cleanCalculToCompute}`);

// caching the result data
const finalResultData = ComputeCalcul(0, cleanCalculToCompute);

// printing the result
console.log(`\n${cleanCalculToCompute} = ${finalResultData.number}\n`);