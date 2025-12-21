import ButtonIcon from "@/components/common/ButtonIcon";
import { Modal, ModalContent, ModalTrigger } from "@/components/ui/Modal";
import ProductWithDescription from "./ProductWithDescription";
import { ProductWithDescriptionItem } from "../types/product.type";
import CartBtn from "@/features/cart/components/CartBtn";
import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { cookies } from "next/headers";
import { cacheTag } from "next/cache";
import WhiteListBtn from "@/features/whiteList/components/WhiteListBtn";

async function ProductFeaturesBar({
  productSummery,
  productId,
}: {
  productSummery: ProductWithDescriptionItem;
  productId: number;
}) {
  const session = await auth();
  const userId = session?.user?.id;
  const cookiesStore = await cookies();
  const guestId = cookiesStore.get("guestId")?.value;

  const [isProductInCart, isProductWhiteListed] = await Promise.all([
    getIsInCart(productId, userId, guestId),
    getIsWhiteListed(productId, userId, guestId),
  ]);

  return (
    <menu className="absolute top-2 right-2 z-10 flex flex-col gap-3">
      <li>
        <Modal>
          <ModalTrigger>
            <ButtonIcon
              icon="eye"
              size="medium"
              rounded="rounded-full"
              ariaLabel="view product snap icon"
            />
          </ModalTrigger>
          <ModalContent>
            <ProductWithDescription productSummery={productSummery} />
          </ModalContent>
        </Modal>
      </li>
      <li>
        <CartBtn productId={productId} productSummery={productSummery} />
      </li>
      <li>
        <WhiteListBtn
          productId={productId}
          initIsProductWhiteListed={isProductWhiteListed}
        />
      </li>
    </menu>
  );
}

async function getIsWhiteListed(
  productId: number,
  userId: string | undefined,
  guestId: string | undefined,
) {
  "use cache";
  if (!userId && !guestId) return false;
  cacheTag(`whiteListItem-${productId}-${userId || guestId}`);

  return await prisma.whiteListItem
    .count({
      where: userId ? { userId, productId } : { guestId, productId },
    })
    .then((count) => count > 0);
}

async function getIsInCart(
  productId: number,
  userId: string | undefined,
  guestId: string | undefined,
) {
  "use cache";
  if (!userId && !guestId) return false;

  cacheTag(`cartItem-${productId}-${userId || guestId}`);

  return await prisma.cartItem
    .count({
      where: userId ? { userId, productId } : { guestId, productId },
    })
    .then((count) => count > 0);
}

export default ProductFeaturesBar;
