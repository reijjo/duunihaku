type LoadingProps = {
  text?: string;
};

export const Loading = ({ text = "Loading..." }: LoadingProps) => (
  <p style={{ textAlign: "center" }}>{text}</p>
);
