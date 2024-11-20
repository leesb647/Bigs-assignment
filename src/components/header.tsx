import Link from "next/link"
import styled from "styled-components"
import Button from "./styled-button"
import { useRouter } from "next/navigation"
import { useStores } from "@/store/context"
import { observer } from "mobx-react"
import { ResponsiveContainer } from "./responsive"

export const Header = observer(() => {
  const { userStore } = useStores()
  const router = useRouter()

  const onClick = async () => {
    userStore.clearUserData()
    await localStorage.removeItem('accessToken')
    await localStorage.removeItem('refreshToken')
    await localStorage.removeItem('user')
    router.push('/auth/login')
  }

  return (
    <HeaderContainer>
      <Wrapper>
        <Link className="logo" href={'/boards'}><h1>B  I  G  S</h1></Link>
        <div className="right">
          { userStore.user.username !== ""
            ? (
                <div className="right-wrapper">
                  {/* <h5>{`${userStore.user.username}`}</h5> */}
                  <div className="username">{`${userStore.user.username}`}</div>
                  <Button
                    onClick={onClick}
                  >
                    로그아웃
                  </Button>
                </div>
              )
            : <div><Button to='/auth/login'>로그인</Button></div>
          }
        </div>
      </Wrapper>
    </HeaderContainer>
  )
})

const HeaderContainer = styled.div`
  position: block;
  width: 100%;
  height: 7rem;
  background: white;
  box-shadow: 0px 2px 4px black;
`

const Wrapper = styled(ResponsiveContainer)`
  width: 60%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
  }
  .right {
    display: flex;
    align-items: center;
  }
  .right-wrapper{
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .username {
    font-weight: bold;
  }

  .right > div > button {
    height: 2.5rem;
    margin-left: 1.5rem
  }

  @media (max-width: 425px) {
    .username {
      font-size: 0.75rem;
    }
    .right {
      height: inherit;
      justify-content: center;
    }
    .right-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .right > div > button {
      font-size: 0.75rem;
      margin-left: 0px;
    }
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`
