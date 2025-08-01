const ContentTooltipSamrtphone = () => {
  const list: { title: string; content: string[] }[] = [
    {
      title: "",
      content: [""],
    },
  ];
  return (
    <>
      <div className="bg-white rounded-lg p-4 flex gap-x-4">
        {list.map((item, index) => (
          <div className="w-1/5" key={index}>
            <span>{item.title}</span>
            {item.content.map((content, index) => (
              <div key={index}>
                <span>{content}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default ContentTooltipSamrtphone;
