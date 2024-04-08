import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import ArtWorkCardDetails from "@/components/ArtworkCard";
import { useRouter } from "next/router";

export default function ObjectID() {
    const router = useRouter();
    const  { objectID } = router.query;
    return (
        <Row>
            <Col>
            <ArtWorkCardDetails objectID={objectID}/>
            </Col>
        </Row>
    )
}