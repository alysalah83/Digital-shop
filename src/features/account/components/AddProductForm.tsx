"use client";

import { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import toast from "react-hot-toast";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import FormInput from "@/components/ui/FormInput";
import Button from "@/components/common/Button";
import { useForm, UseFormRegisterReturn } from "react-hook-form";
import { addProduct } from "../actions/account.actions";
import { CreateProductInputs } from "../types/account.type";

type Categories = Prisma.CategoryGetPayload<{
  select: { name: true; id: true };
}>[];

function AddProductForm({ categories }: { categories: Categories }) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CreateProductInputs>({ mode: "all" });
  const [isPending, setIsPending] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null | undefined>(
    null,
  );

  const onSubmit = async (data: CreateProductInputs) => {
    if (!image) return toast.error("product image is required");
    setIsPending(true);
    const state = await addProduct(data, image);
    setIsPending(false);

    if (state.success) {
      setImage(null);
      setImagePreview(null);
      toast.success(state.message);
      reset();
    } else if (state.error) toast.error(state.message);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 px-8 py-6"
    >
      <FormInput
        register={register("name", {
          required: "Product name is Required",
          disabled: isPending,
        })}
        errorMessage={errors.name?.message}
        label="Name"
        inputType="text"
        disabled={isPending}
      />
      <FormInput
        register={register("price", {
          required: "Product price  is Required",
          disabled: isPending,
          valueAsNumber: true,
        })}
        errorMessage={errors.price?.message}
        label="Price"
        inputType="number"
        disabled={isPending}
      />
      <FormInput
        register={register("brand", {
          required: "Product brand is Required",
          disabled: isPending,
        })}
        label="Brand"
        inputType="text"
        disabled={isPending}
      />
      <SelectCategory
        categories={categories}
        register={register("category", {
          required: "Product category is Required",
          disabled: isPending,
          valueAsNumber: true,
        })}
      />
      <FormInput
        register={register("stock", {
          required: "Product stock is Required",
          disabled: isPending,
          valueAsNumber: true,
        })}
        errorMessage={errors.stock?.message}
        label="Stock"
        inputType="number"
        disabled={isPending}
      />
      <div className="space-y-1">
        <textarea
          {...register("description", {
            required: "Product description is Required",
            disabled: isPending,
          })}
          placeholder="Description"
          required
          disabled={isPending}
          className="mt-6 h-36 w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-2 ring-blue-600 outline-0 transition duration-300 focus:bg-gray-50 focus:ring-1 disabled:cursor-not-allowed disabled:bg-gray-300"
        />
        {errors.description?.message && (
          <p className="text-sm font-medium text-red-700">
            {errors.description?.message}
          </p>
        )}
      </div>

      <ImageUploader
        disabled={isPending}
        image={image}
        setImage={setImage}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
      />
      <div className="mt-8 flex items-center">
        <Button disabled={isPending} buttonType="submit">
          add product
        </Button>
      </div>
    </form>
  );
}

function SelectCategory({
  categories,
  register,
}: {
  categories: Categories;
  register: UseFormRegisterReturn<"category">;
}) {
  return (
    <select
      {...register}
      name="category"
      title="select category"
      className="p mt-6 rounded-lg border border-gray-300 px-5 py-2 text-gray-600 capitalize outline-0 transition duration-300 focus:border-blue-600 disabled:cursor-not-allowed disabled:bg-gray-200"
    >
      <option value="">Select Category</option>
      {categories.map(({ name, id }) => (
        <option value={id} className="capitalize" key={id}>
          {name}
        </option>
      ))}
    </select>
  );
}

interface ImageUploaderProps {
  disabled: boolean;
  image: File | null;
  setImage: React.Dispatch<React.SetStateAction<null | File>>;
  imagePreview: string | null | undefined;
  setImagePreview: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
}

function ImageUploader({
  disabled,
  image,
  setImage,
  imagePreview,
  setImagePreview,
}: ImageUploaderProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return toast.error("no image are selected");

    if (file.size > 5 * 1024 * 1024)
      return toast.error("image size must be less than 5 MB");

    const reader = new FileReader();

    reader.onload = (e) => {
      if (typeof e.target?.result === "string")
        setImagePreview(e.target?.result);
    };

    reader.readAsDataURL(file);
    setImage(file);
  };
  return (
    <div className="mt-6 flex flex-wrap items-center gap-4">
      <label
        className={`flex w-fit cursor-pointer items-center gap-1 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 px-5 py-2 font-semibold text-gray-600 transition duration-300 disabled:cursor-not-allowed disabled:bg-gray-200`}
      >
        <IoIosAdd className="h-5 w-5" />
        <span className="text-nowrap">Upload Image</span>
        <input
          type="file"
          name="imageFile"
          onChange={handleFileChange}
          accept="image/*"
          required
          disabled={disabled}
          className="hidden"
        />
      </label>
      {image && (
        <div className="flex items-center gap-2 lg:gap-3">
          <span className="text-sm font-medium tracking-wide text-gray-400">
            Uploaded: {image.name}
          </span>
          {imagePreview && (
            <Image
              width={45}
              height={45}
              src={imagePreview}
              alt={image.name}
              className="object-contain"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default AddProductForm;
