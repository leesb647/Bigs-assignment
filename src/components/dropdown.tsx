import { useState } from "react"
import styled from "styled-components"

export interface DropdownProps {
  option: string[]
  value: string
  changeField: (v: string, k: 'category') => void
}

export const Dropdown = ({ option, value, changeField }: DropdownProps) => {
  const [show, setShow] = useState(false)

  const onClickMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    const selectedOption = e.target.innerHTML
    changeField(selectedOption, 'category')
    setShow(false)
  }

  return (
    <DropdownContainer>
      <DropdownButton className="dropbtn" onClick={() => {console.log(show); setShow(!show)}}> 
        <div className="dropbtn_icon">
          {value
            ? value
            : '카테고리를 선택해주세요'
          }
        </div>
      </DropdownButton>
      <DropdownContents $show={show} className="dropdown-content">
        {option.map((content, idx) => (
          <DropdownContent
            key={idx}
            onClick={onClickMenu}
          >
            {content}
          </DropdownContent>
        ))}
      </DropdownContents>
    </DropdownContainer>
  )
}

export default Dropdown

const DropdownContainer = styled.div`
  position : relative;
  display : inline-block;
  height: 1.5rem;
  margin-bottom: 5rem;

  .dropbtn_icon{
    display: flex;
    flex-direction: row;
    justify-content: center;
    font-family : 'Material Icons';
    font-size: 0.75rem;
    font-weight: bold;
  }

`

const DropdownButton = styled.button`
  border : 1px solid rgb(37, 37, 37);
  border-radius : 4px;
  background-color: #f5f5f5;
  font-weight: 400;
  color : rgb(37, 37, 37);
  padding : 12px;
  width :200px;
  text-align: left;
  cursor : pointer;
  font-size : 12px;
  font-family : 'Material Icons';
`

const DropdownContents = styled.div<{ $show: boolean }>`
  display : ${({ $show }) => $show ? 'block' : 'none'};
  position : absolute;
  z-index : 1; /*다른 요소들보다 앞에 배치*/
  font-weight: 400;
  background-color: #f9f9f9;
  min-width : 200px;
  z-index: 15;

  .dropdown-content a{
    display : block;
    text-decoration : none;
    color : rgb(37, 37, 37);
    font-size: 12px;
    padding : 12px 20px;
  }
`

const DropdownContent = styled.div`
  display : flex;
  flex-direction: row;
  justify-content: center;
  text-decoration : none;
  color : rgb(37, 37, 37);
  font-size: 12px;
  padding : 12px 20px;

`