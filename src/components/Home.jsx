import React from 'react'

export default function Home() {
  return (
    <div className='intro'>
      So this is just a recap of some beautiful algorithms and data structures commonly used in computer science .
      <br/><br/>
      They are classified into 3 sections : Sorting algorithms , Searching algorithms and others .
      <br/><br/>
      Sorting algorithms contains the most important and time efficient algorithms used to arrange data . The algorithms that we cover in this section are : Merge Sort , Quick Sort and Heap Sort .
      As you'll see , you will be able to generate random columns that will be sorted as soon as you press one of the sorting algorithms . Although the algorithms are conceptually similar ,each one 
      has its own and characteristic visual approach .Merge sort and Quick sort are fully stable sorting algorithms , but Heap Sort isn`t stable . This means that it can
      happen that for the particular set of random columns that you have , it can`t find a solution . This is completely normal and it is done on purpose to show the unstability of this particular algorithm .
      <br/><br/>
      Then we have the searching section , where we cover Linear search and Binary Search .In this section you will be able to input a number and search if there's a column with a height given by 
      the number you introduced . This number has to be between 0 and 150 , the range of heights that each column can take .The purpose of this section is to show the time efficiency 
      difference between the 2 main searching algorithms , Linear Search and Binary Search , and to understand why Binary Search is so powerful .
      <br/><br/>
      Finally we have the others section . This section contains a mix between algorithms like the Sliding Window , but also data structures visualization like the Linked List and the Binary Tree .
      <br/><br/>
      The Sliding Window algorithm will take a string that you input and search for the minimum length string with the same letters , contained in the randomly generated string provided .I'm sure 
      you'll see it clear as soon as you try it .
      <br/><br/>
      Both the Linked List and Binary tree are designed to visualize and understand the main operations that we can do with these data structures , like adding a node or deleting it .The implementation 
      of these 2 data structures was done as rigorous as it could've been , because the truth is , as far as I can tell , that there isn`t a native way to work with these 2 data structures
      and show the results visually in a webpage .Nevertheless , the main task which is to visually see how they work I think it is pretty fairly accomplished .
    </div>
  )
}
