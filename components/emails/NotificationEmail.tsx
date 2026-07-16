import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Section,
  Text,
  Font,
  Img,
} from "@react-email/components";

interface NotificationEmailProps {
  logoUrl: string;
  formTitle: string;
  submissionId: string;
  data: Record<string, unknown>;
  submittedAt: string;
}

export function NotificationEmail({
  logoUrl,
  formTitle,
  submissionId,
  data,
  submittedAt,
}: NotificationEmailProps) {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Geist"
          fallbackFontFamily="sans-serif"
          webFont={{
            url: "https://cdn.jsdelivr.net/npm/geist@1.3.0/dist/fonts/geist-sans/Geist-Regular.woff2",
            format: "woff2",
          }}
        />
      </Head>
      <Preview>New submission — {formTitle}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img src={logoUrl} alt="Formy" width={96} height={24} style={logo} />
          <Heading style={heading}>New submission received</Heading>
          <Text style={subtitle}>
            Your form <strong style={{ color: "#1c1b1b" }}>{formTitle}</strong>{" "}
            just got a response.
          </Text>

          <Section style={table}>
            <Text style={tableHeader}>Submission data</Text>
            {Object.entries(data).map(([key, value]) => (
              <Row key={key} style={row}>
                <Text style={labelCell}>{key}</Text>
                <Text style={valueCell}>{String(value)}</Text>
              </Row>
            ))}
          </Section>

          <Text style={meta}>ID: {submissionId}</Text>
          <Text style={meta}>Submitted: {submittedAt}</Text>

          <Section style={footer}>
            <Text style={footerText}>
              Formy — simple form submissions for developers
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  margin: 0,
  padding: 0,
  backgroundColor: "#fcf9f8",
  fontFamily:
    "'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const container = {
  maxWidth: "520px",
  margin: "40px auto",
  padding: "32px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
};

const logo = {
  margin: "0 0 20px",
};

const heading = {
  fontSize: "20px",
  fontWeight: 600,
  color: "#1c1b1b",
  margin: "0 0 4px",
};

const subtitle = {
  fontSize: "14px",
  color: "#6b6560",
  margin: "0 0 24px",
};

const table = {
  border: "1px solid #f0ece8",
  borderRadius: "8px",
  marginBottom: "24px",
};

const tableHeader = {
  fontSize: "11px",
  fontWeight: 600,
  color: "#6b6560",
  letterSpacing: "0.05em",
  textTransform: "uppercase" as const,
  padding: "12px 16px",
  margin: 0,
  backgroundColor: "#fcf9f8",
  borderBottom: "1px solid #f0ece8",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
};

const row = {
  borderBottom: "1px solid #f0ece8",
};

const labelCell = {
  fontSize: "13px",
  color: "#6b6560",
  padding: "8px 16px",
  margin: 0,
  whiteSpace: "nowrap" as const,
  width: "140px",
  verticalAlign: "top" as const,
};

const valueCell = {
  fontSize: "14px",
  color: "#1c1b1b",
  padding: "8px 16px",
  margin: 0,
  wordBreak: "break-word" as const,
};

const meta = {
  fontSize: "12px",
  color: "#9a9490",
  margin: "0 0 4px",
};

const footer = {
  marginTop: "24px",
  paddingTop: "16px",
  borderTop: "1px solid #f0ece8",
};

const footerText = {
  fontSize: "11px",
  color: "#9a9490",
  margin: 0,
  textAlign: "center" as const,
};
