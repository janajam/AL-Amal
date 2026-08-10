import { Card, Skeleton } from "@mui/material";
import CardContainer from "./CardContainer";

interface CardSkeletonProps {
  height?: number;
}

const CardSkeleton = ({ height = 250 }: CardSkeletonProps) => {
  return (
    <CardContainer>
      <Card sx={{ my: 2 }}>
        <Skeleton
          variant="rounded"
          width="100%"
          height={height}
        />
      </Card>
    </CardContainer>
  );
};

export default CardSkeleton;