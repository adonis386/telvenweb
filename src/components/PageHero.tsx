interface PageHeroProps {
  image: string;
}

const PageHero = ({ image }: PageHeroProps) => {
  return (
    <div className="relative h-[500px]">
      <img
        src={image}
        alt="Hero image"
        className="w-full h-full object-cover"
      />
    </div>
  )
}

export default PageHero 