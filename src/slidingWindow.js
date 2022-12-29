
// O(n) solution because of the use of the sliding window

function runSlidingWindow(string,setString,inputString){

    // First we are going to create an object with the letters
    // contained in the input string . This will allow us acces
    // in O(1)

    inputString = inputString.split("")

    var setOfLettersNeeded = new Set()
    var lettersNeeded = {}
    var totalLettersNeeded = 0

    for (let i=0 ; i<inputString.length ; i++){
        var currentLetter = inputString[i]

        // Handle if its not in the input string object/hashmap
        if (!setOfLettersNeeded.has(currentLetter)){
            // First we add it to the set to cover next iteractions
            setOfLettersNeeded.add(currentLetter)

            // Given that it¡s not in the object input string ,we'll add 
            // the letter and initialize the counter
            lettersNeeded = {
                ...lettersNeeded,
                [currentLetter] : 1,
                total : totalLettersNeeded += 1
            }
        }else{
            // If its already in the object we'll just update the counter
            const currentCounter = lettersNeeded[currentLetter]

            lettersNeeded = {
                ...lettersNeeded ,
                [currentLetter] : currentCounter + 1,
                total : totalLettersNeeded += 1
            }
        }
    }

    // We'll have to treat the data because we are not just running 
    // the simple algo and every element of the string is an object
    // with a value and a color propertie
    // However , this doesnt increase time complexity because 
    // it has the same length O(n) and it is in the same hierarchichal level
    // This process would be the equivalent to split("")

    var stringArray = []

    for (let i=0 ; i<string.length ; i++){
        stringArray.push(string[i].value)
    }

    // Now we can iterate through the array and develop the algorithm

    var leftPointer = 0
    var rightPointer = 0
    var minimumLength = Infinity
    var minimumSubstring = ""
    var lettersHave = {}
    var setOfLettersHave = new Set()
    var totalLettersHave = 0

    // O(n) sorting window algorithm

    while (rightPointer < stringArray.length - 1){
        var currentStringLetter = stringArray[rightPointer]
        // First we advance if the current letter read in the string isnt in 
        // the set of letters that we are looking for 
        if ( !setOfLettersNeeded.has(currentStringLetter) ){
            rightPointer += 1
        }else if( setOfLettersNeeded.has(currentStringLetter)){
            // First we'll update the letters that we have

            // We'll have to difference if the letter its already in the have set or not
            // because to update the letters have hashmap
            if (!setOfLettersHave.has(currentStringLetter)){
               setOfLettersHave.add(currentStringLetter) 
               lettersHave = {
                ...lettersHave ,
                [currentStringLetter] : 1,
                total : totalLettersHave += 1
               }
            }else {
                var currentLetterCount = lettersHave[currentStringLetter]

                lettersHave = {
                    ...lettersHave,
                    [currentStringLetter] : currentLetterCount += 1 ,
                    total : totalLettersHave += 1
                }

            }

            // In either case we'll check if now we have the necessary letters that match the input
            // First we can just compare if there are the same letters in the hashmaps
            // If there are less we will continue and advance the right pointer to find new letters
            // that could potentially add the count to match the input

            if ( lettersHave.total < lettersNeeded.total ){
                rightPointer += 1
                continue ;
            }

            // But if we have the same or more letters and we get here we are going to compare if they match key by key

            var substringInside = true

            for (var [letter,countNeeded] of Object.entries(lettersNeeded)){
                // First we cover if we have the letter needed
                if (!lettersHave[letter]){
                    substringInside = false
                }
                // If we have it we check that it has the necessary frecuency
                else if (lettersHave[letter] < countNeeded){
                    substringInside = false
                }
            }

            // We are going to get out if they dont match . We do it here to apply the break effectively

            if (!substringInside){
                rightPointer += 1
                continue;
            }

            // If on the other hand there are the same or more amount of letters in both objects ,
            // we are going to shrink the left pointer until it breaks the condition and saving the 
            // result in each iteraction . The reason to do that is that maybe the letter that was 
            // added by the right pointer minimizes a letter that is far from the left pointer extreme

            while (substringInside){
                // Save the current string and the length
                const currentSubstring = stringArray.slice(leftPointer,rightPointer+1)
                const currentLength = currentSubstring.length

                // We'll update the final result every time we find a smaller substring 
                if (currentLength <= minimumLength){
                    minimumSubstring = currentSubstring
                    minimumLength = currentLength
                }

                // Shrink left pointer
                leftPointer += 1

                // Update the letters that we have with the new size of the string -> shrinked string
                // We are just going to substract the letter popped to the object lettersHave, that 
                // way when we check if theres still a substring inside we'll use the new size
                // We'll differentiate if the letter popped is in the letters have object or not
                const letterPopped = stringArray[leftPointer-1]

                if (setOfLettersHave.has(letterPopped)){
                    // If the letter is in the set we'll get the current count to update it afterwards
                    const letterPoppedCount = lettersHave[letterPopped]
                    const totalCount = lettersHave.total

                    lettersHave = {
                        ...lettersHave ,
                        [letterPopped] : letterPoppedCount - 1 ,
                        total : totalCount -1
                    }

                    // Given that we are deleting a letter we also need to update the letter's count from the set
                    // If the updated count is 0 we are going to delete it from the set of letters that we have
                    if (letterPoppedCount-1 < 1){
                        setOfLettersHave.delete(letterPopped)
                    }

                    // Given that we have updated the object letters have, we'll check if there's still a substring
                    // with the new changes applied 

                    for ([letter,countNeeded] of Object.entries(lettersNeeded)){
                        // First we cover if we have the letter needed
                        if (!lettersHave[letter]){
                            substringInside = false
                        }
                        // If we have it we check that it has the necessary frecuency
                        else if (lettersHave[letter] < countNeeded){
                            substringInside = false
                        }
                    }
                }
            }
            // If we get here we also have to update to the next iteraction
            rightPointer += 1
        }
    }
    // Will return empty string if it doesnt found one
    return [minimumSubstring,minimumLength]
}

export default function slidingWindow(string,setString,inputString) {
    const stringCopy = JSON.parse(JSON.stringify(string));
    const [minimumSubstring,minimumLength] = runSlidingWindow(stringCopy,setString,inputString);
    console.log(minimumSubstring,minimumLength)
};
