-- DropIndex
DROP INDEX "public"."CartItem_guestId_productId_key";

-- DropIndex
DROP INDEX "public"."CartItem_userId_productId_key";

-- CreateIndex
CREATE INDEX "CartItem_userId_productId_idx" ON "CartItem"("userId", "productId");

-- CreateIndex
CREATE INDEX "CartItem_guestId_productId_idx" ON "CartItem"("guestId", "productId");
