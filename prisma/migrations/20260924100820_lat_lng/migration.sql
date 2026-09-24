-- AlterTable
ALTER TABLE "KBConcept" ADD COLUMN     "alt" DOUBLE PRECISION,
ADD COLUMN     "lat" DOUBLE PRECISION,
ADD COLUMN     "lng" DOUBLE PRECISION;

-- CreateIndex
CREATE INDEX "KBConcept_lat_idx" ON "KBConcept"("lat");

-- CreateIndex
CREATE INDEX "KBConcept_lng_idx" ON "KBConcept"("lng");
