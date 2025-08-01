const PictureCategory = () => {
  const image: { image: string }[] = [
    {
      image: "/images/samsung-galaxy-m55-5g-8gb-256gb.webp",
    },
    {
      image: "/images/690x300-rightbanner-1.webp",
    },
    {
      image: "/images/690x300-rightbanner-2.webp",
    },
  ];
  return (
    <>
      <div className="md:flex flex-col gap-y-4 rounded-lg overflow-hidden h-full hidden">
        {image.map((item, index) => (
          <img
            key={index}
            src={item.image}
            className="h-[8rem] w-full cursor-pointe object-containr "
          />
        ))}
      </div>
    </>
  );
};

export default PictureCategory;
