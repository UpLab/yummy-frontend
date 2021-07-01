import { Card, Row, Col } from 'react-bootstrap';

export default function AuthCenteredCard({ children }) {
  return (
    <Row className="mt-5">
      <Col
        lg={{ span: 6, offset: 3 }}
        md={{ span: 8, offset: 2 }}
        sm={{ span: 12 }}
      >
        <Card>
          <Card.Body>{children}</Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
