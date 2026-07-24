import girlie from '../assets/girlie.png'

export const SectionTwo = () => {
  return (
    <div>
      <section className='bg-gray-100 pt-20'>
        <h1 className='capitalize text-5xl text-center'>Real skills for real careers</h1>
        <div className="container pt-20 pb-10 flex">
          <img src={girlie} alt="girl background" className='w-3xl' />
          <div className="card w-143 h-140 rounded-lg ">
            <div className='bg-linear-to-t from-black to-white/0'></div>
          </div>
        </div>
      </section>
    </div>
  )
}
