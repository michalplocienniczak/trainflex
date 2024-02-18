import { Button } from 'antd'
import Link from 'next/link'

export const LandingPage = () => {
  return (
    <div className="w-full flex flex-col place-items-center">
      <h1
        className="font-bold"
        style={{
          fontSize: '45px',
          marginTop: '10vh',
        }}
      >
        Train and Flex, with your friends!
      </h1>
      <p>Join the best fitness and flex platform on the market!</p>
      <Link
        href="/api/auth/signin"
        style={{
          marginTop: '5vh',
        }}
      >
        <Button type="primary" size="large">
          Join Now
        </Button>
      </Link>
    </div>
  )
}
