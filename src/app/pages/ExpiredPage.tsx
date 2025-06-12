import AlertIcon from "../../assets/alert";
import { Container } from "../../components/ui/Container/Container";

export default function ExpiredPage() {
  return (
    <Container 
      icon={<AlertIcon />}
      title={"Payment details expired"} 
      description={"The payment details for your transaction has expired."}
      />
  )
}
