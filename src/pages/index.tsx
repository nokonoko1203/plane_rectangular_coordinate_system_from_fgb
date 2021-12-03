import type { NextPage } from 'next'
import Map from '@/components/Map';

const Home: NextPage = () => {
  return (
    <>
      <div className="w-screen h-screen">
        <Map />
      </div>
    </>
  )
}

export default Home
