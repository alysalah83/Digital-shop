-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discountPercentage" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "brand" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reviews" JSONB NOT NULL DEFAULT '[]',
    "stock" INTEGER NOT NULL DEFAULT 0,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CartItem" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "userId" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WhiteListItem" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WhiteListItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "public"."Category"("name");

-- CreateIndex
CREATE INDEX "Product_price_idx" ON "public"."Product"("price");

-- CreateIndex
CREATE INDEX "Product_categoryId_idx" ON "public"."Product"("categoryId");

-- CreateIndex
CREATE INDEX "Product_createdAt_idx" ON "public"."Product"("createdAt");

-- CreateIndex
CREATE INDEX "Product_userId_idx" ON "public"."Product"("userId");

-- CreateIndex
CREATE INDEX "Product_categoryId_price_idx" ON "public"."Product"("categoryId", "price");

-- CreateIndex
CREATE INDEX "Product_categoryId_createdAt_idx" ON "public"."Product"("categoryId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_productId_key" ON "public"."CartItem"("productId");

-- CreateIndex
CREATE INDEX "CartItem_userId_idx" ON "public"."CartItem"("userId");

-- CreateIndex
CREATE INDEX "CartItem_productId_idx" ON "public"."CartItem"("productId");

-- CreateIndex
CREATE INDEX "CartItem_userId_createdAt_idx" ON "public"."CartItem"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_userId_productId_key" ON "public"."CartItem"("userId", "productId");

-- CreateIndex
CREATE UNIQUE INDEX "WhiteListItem_productId_key" ON "public"."WhiteListItem"("productId");

-- CreateIndex
CREATE INDEX "WhiteListItem_userId_idx" ON "public"."WhiteListItem"("userId");

-- CreateIndex
CREATE INDEX "WhiteListItem_productId_idx" ON "public"."WhiteListItem"("productId");

-- CreateIndex
CREATE INDEX "WhiteListItem_userId_createdAt_idx" ON "public"."WhiteListItem"("userId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "WhiteListItem_userId_productId_key" ON "public"."WhiteListItem"("userId", "productId");

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CartItem" ADD CONSTRAINT "CartItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CartItem" ADD CONSTRAINT "CartItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WhiteListItem" ADD CONSTRAINT "WhiteListItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WhiteListItem" ADD CONSTRAINT "WhiteListItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
