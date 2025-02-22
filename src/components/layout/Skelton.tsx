import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";

const data = [
  {
    src: "https://i.ytimg.com/vi/pLqipJNItIo/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLBkklsyaw9FxDmMKapyBYCn9tbPNQ",
    title: "Don Diablo @ Tomorrowland Main Stage 2019 | Official…",
    channel: "Don Diablo",
    views: "396k views",
    createdAt: "a week ago",
  },
];

interface MediaProps {
  loading?: boolean;
  quantity: number;
}

function Media(props: MediaProps) {
  const { loading = false, quantity } = props;

  return (
    <Grid container wrap="nowrap">
      {(loading ? Array.from(new Array(quantity)) : data).map((item, index) => (
        <Box key={index} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
          {item ? (
            <img
              style={{ width: 210, height: 118 }}
              alt={item.title}
              src={item.src}
            />
          ) : (
            <Skeleton variant="rectangular" width={210} height={118} />
          )}
          {item ? (
            <Box sx={{ pr: 2 }}>
              <Typography gutterBottom variant="body2">
                {item.title}
              </Typography>
              <Typography
                variant="caption"
                sx={{ display: "block", color: "text.secondary" }}
              >
                {item.channel}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {`${item.views} • ${item.createdAt}`}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ pt: 0.5 }}>
              <Skeleton />
              <Skeleton width="60%" />
            </Box>
          )}
        </Box>
      ))}
    </Grid>
  );
}

const FeaturedSkelton = ({ quantity }: MediaProps) => {
  return (
    <Box sx={{ overflow: "hidden" }}>
      <Media loading quantity={quantity} />
    </Box>
  );
};

export default FeaturedSkelton;
