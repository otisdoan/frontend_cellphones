import { Skeleton } from "antd";

const SkeletonProduct = () => {
  return (
    <div className="flex flex-col gap-y-3 w-full rounded-lg p-3 shadow-lg cursor-pointer bg-white">
      <Skeleton.Image
        active
        className="!w-full !h-[180px] object-contain rounded-md"
      />
      <Skeleton.Input active size="small" className="!w-3/4 !h-5 rounded-md" />

      <div className="flex items-center gap-x-2">
        <Skeleton.Input
          active
          size="small"
          className="!w-full !h-4 rounded-md"
        />
      </div>

      <div className="flex flex-col gap-y-2">
        <Skeleton.Input
          active
          size="small"
          className="!w-full !h-4 rounded-md"
        />
        <Skeleton.Input
          active
          size="small"
          className="!w-full !h-4 rounded-md"
        />
        <Skeleton.Input
          active
          size="small"
          className="!w-full !h-4 rounded-md"
        />
      </div>

      <div className="flex justify-between !gap-x-1">
        <Skeleton.Input active className="!w-full !h-4 rounded-md" />
      </div>
    </div>
  );
};

export default SkeletonProduct;
