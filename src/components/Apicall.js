import React, { useState, useEffect } from "react";

const Apicall = ({ primes, fibo, odd, random, input }) => {
  const [number, setNumber] = useState([]);
  const [arr, setArr] = useState([]);

  function splitUrls(urlString) {
    const decodedUrlString = decodeURIComponent(urlString);

    const urlPart = decodedUrlString.split("?url=")[1];

    const urlSegments = urlPart.split("&url=");
    const cleanedUrls = urlSegments.map((segment) => segment.trim());
    return cleanedUrls;
  }
  const urlString =
    "http://localhost:8000/numbers?url=http://20.244.56.144/numbers/primes&url=http://20.244.56.144/numbers/fibo&url=http://20.244.56.144/numbers/odd";

  const urls = splitUrls(urlString);
  //   console.log(urls);

  //   const fetchData = (urls) => {
  //     urls.map((url) => {
  //       fetch(url)
  //         .then((response) => {
  //           return response.json();
  //         })
  //         .then((data) => {
  //           const newData = JSON.stringify(data);
  //           setNumber((prevState) => {
  //             return [...prevState, newData];
  //           });
  //         });
  //     });
  const fetchData = (urls) => {
    Promise.all(
      urls.map((url) => fetch(url).then((response) => response.json()))
    )
      .then((responses) => {
        const combinedNumbers = responses.reduce((result, response) => {
          return result.concat(response);
        }, []);
        setNumber(combinedNumbers);
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  //   console.log(finalArr);
  useEffect(() => {
    fetchData(urls);
    console.log(number);
    for (let i = 0; i < number.length; i++) {
      setArr((prevState) => {
        // console.log(prevState);
        return [...prevState, number[i].numbers];
      });
    }
  }, []);
  const singleArray = [].concat(...arr);
  // console.log(singleArray.sort());
  const uniqueArray = singleArray.filter(
    (item, index) => singleArray.indexOf(item) === index
  );
  const compareNumbers = (a, b) => a - b;
  const sortedArray = uniqueArray.sort(compareNumbers);
  console.log(sortedArray);
  return <div>Number: {sortedArray.join(",")}</div>;
};
// 2 3 5 7 11 13 1 1  235813211357911131517192123
export default React.memo(Apicall);
