import React from "react";
import "./Pagination.styles.css";
//I usually use Material ui Pagination also some other parts of it but since u wanted too see my javascript and skills  i made it by my own
const Pagination = ({
  pages,
  clickedPage,
  onClickOfPage,
  IncreasePageByThree,
  IncreasePageByOne,
  DecreasePageByOne,
  DecreasePageByThree,
}) => {
  //by geting pages(nr of pages) as attribute i put them in an array to use them for jsx pagination creation
  let nrofpages = [];
  for (let i = 0; i < pages; i++) {
    nrofpages.push(i + 1);
  }
  let pageCount = 0;
  return (
    <div className="pagination">
      {/*I used two type of arrows to increase or decrease page by 1 or by 3 each one with onclick that i get this 
      function as a prop becouse of accesing some other properties needed*/}
      {/*arows for decrement*/}
      <div className="Paginationpages Symbols" onClick={DecreasePageByThree}>
        &laquo;
      </div>
      <div
        //some times for  small parts i usally make inline styles saves me a bit of time
        className="Paginationpages Symbols Lite"
        style={{ position: "relative", left: "-1.5vw" }}
        onClick={DecreasePageByOne}
      >
        &lt;
      </div>
      {/*pagination logic pages in this case are generatelly based on array size*/}
      {nrofpages.map((page) => {
        //keep track of page number
        pageCount++;
        return nrofpages.length <= 10 ? (
          //if pages are less than 10 i just want to display them all no need to pass on other conditions will ignore them all
          <div
            key={page}
            className={`${
              clickedPage === page
                ? "Paginationpages Numbers Clicked"
                : "Paginationpages Numbers"
            }`}
            id={page}
            onClick={() => {
              onClickOfPage(page);
            }}
          >
            {page}
          </div>
        ) : // otherwise i want always to show page 1 2  and 3 becouse it will give user posibillity to go back to start
        pageCount === 1 || pageCount === 2 || pageCount === 3 ? (
          <div
            key={page}
            className={`${
              clickedPage === page
                ? "Paginationpages Numbers Clicked"
                : "Paginationpages Numbers"
            }`}
            id={page}
            onClick={() => {
              onClickOfPage(page);
            }}
          >
            {page}
          </div>
        ) : //then if clicked page is  greater than 6 i dont want to show page 4 and 5 but giving just some points that before those pages has some other pages
        (pageCount === 4 && clickedPage >= 6) ||
          (pageCount === 5 && clickedPage >= 6) ? (
          <div key={page} className="Paginationpages Points" id={page}>
            .
          </div>
        ) : //then if clicked page is one of last six pages  or first 5 pages  i want that user get
        //acces to page middle number(.lenght/2 or .length/2-1) by showing them
        (clickedPage + 6 >= nrofpages.length || clickedPage <= 5) &&
          (pageCount === parseInt(nrofpages.length / 2) ||
            pageCount === parseInt(nrofpages.length / 2 + 1)) ? (
          <div
            key={page}
            className={`${
              clickedPage === page
                ? "Paginationpages Numbers Clicked"
                : "Paginationpages Numbers"
            }`}
            id={page}
            onClick={() => {
              onClickOfPage(page);
            }}
          >
            {page}
          </div>
        ) : //then if clicked page is one of last six pages or first 5 pages i want that user to give an affect that after
        //middle pages show some points (nrofpages.length / 2 + 2 and nrofpages.length / 2 + 3 )to give them again
        //the look that are some pages between middle pages and others
        //Puting points will make the list of pages smaller and every single page accesible by the user it just make sure that if it is big number pagination user has acces
        //Only in some pages and he needs to click on some pages to see others (user will user have acces on first 3 pages last 4 pages and some pages after the clicked pages)
        //So whenever he click a page he will have acces to see some next pages and some previous pages or he could easily go back at the start or at the end
        (clickedPage + 6 >= nrofpages.length || clickedPage <= 5) &&
          (pageCount === parseInt(nrofpages.length / 2 + 2) ||
            pageCount === parseInt(nrofpages.length / 2 + 3)) ? (
          <div key={page} className="Paginationpages Points" id={page}>
            .
          </div>
        ) : // i make sure that everytime user see 4 last pages in order if he want to go to the end
        pageCount + 3 >= nrofpages.length ? (
          <div
            key={page}
            className={`${
              clickedPage === page
                ? "Paginationpages Numbers Clicked"
                : "Paginationpages Numbers"
            }`}
            id={page}
            onClick={() => {
              onClickOfPage(page);
            }}
          >
            {page}
          </div>
        ) : // this two conditions are the condition to show the users some pages before(2)  and after (2) clicked page
        pageCount >= 3 + clickedPage && pageCount <= 4 + clickedPage ? (
          <div key={page} className="Paginationpages Points" id={page}>
            .
          </div>
        ) : pageCount <= 3 + clickedPage && pageCount + 2 >= clickedPage ? (
          <div
            key={page}
            className={`${
              clickedPage === page
                ? "Paginationpages Numbers Clicked"
                : "Paginationpages Numbers"
            }`}
            id={page}
            onClick={() => {
              onClickOfPage(page);
            }}
          >
            {page}
          </div>
        ) : null;
      })}
      <div
        //Arrows for incremenet
        className="Paginationpages Symbols Lite"
        style={{ position: "relative", left: "1.5vw" }}
        onClick={IncreasePageByOne}
      >
        &gt;
      </div>
      <div className="Paginationpages Symbols" onClick={IncreasePageByThree}>
        &raquo;
      </div>
    </div>
  );
};

export default Pagination;
