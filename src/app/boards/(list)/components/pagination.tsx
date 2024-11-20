'use client'

import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import styled from "styled-components";

interface PaginationProps {
  totalElements: number
  size: number
  pageSize: number
  number: number // currentPage
  totalPages: number
  first: boolean
  last: boolean
}

export const Pagination = ({
  // totalElements,
  size,
  pageSize,
  number,
  totalPages,
  first,
  last,
}: PaginationProps) => {
  const [start, setStart] = useState(1);

  useEffect(() => {
    if (number === start + pageSize) setStart((prev) => prev + pageSize);
    if (number < start) setStart((prev) => prev - pageSize);
  }, [number, pageSize, start]);

  return (
    <PaginationContainer>
      <ul>
        <li className={`move ${first && 'invisible'}`}>
          <Link href={`?page=${start - 2}&size=${size}`}>이전</Link>
        </li>
        {[...Array(pageSize)].map((a, i) => (
          <Fragment key={i}>
            {start + i <= totalPages && (
              <li key={i}>
                <Link className={`page `}
                  href={`?page=${start + i}`}>
                  {start + i}
                </Link>
              </li>
            )}
          </Fragment>
        ))}
        <li className={`move ${last && 'invisible'}`}>
          <Link href={`?page=${start + pageSize - 1}&size=${size}`}>다음</Link>
        </li>
      </ul>
    </PaginationContainer>
  );
}

export default Pagination

const PaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  color: #888;
  font-size: 14px;

  ul {
    list-style: none;
  }

  li {
    float: left;
    height: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  a {
    height: 25px;
    line-height: 25px;
  }

  .page {
    margin: 0 5px;
    cursor: pointer;
    width: 25px;
    border-radius: 30px;
    border: solid 1px rgba(0, 0, 0, 0);
    text-align: center;
  }

  .page:hover {
    border: solid 1px #aaa;
  }

  .icon, .move:last-child::after, .move:first-child::before {
    position: absolute;
    font-size: 20px;
    padding: 0 7px 0px;
  }

  .move {
    position: relative;
    cursor: pointer;
    margin: 0 10px;
  }
  .move a {
    width: 50px;
    display: block;
    z-index: 10;
  }
  .move a:hover {
    text-decoration: underline;
  }
  .move:first-child {
    text-align: right;
  }
  .move:first-child::before {
    content: "<";
    left: 0;
  }
  .move:last-child::after {
    content: ">";
    right: 0;
  }

  .invisible {
    visibility: hidden;
  }

  .active {
    font-weight: 700;
    background: #2f5d62;
    color: white;
  }
`
