import jsPDF from "jspdf";
import { toast } from "sonner";

type ManifestacaoDetalhe = {
  id: string;
  protocolo: string;
  assunto: string;
  conteudo: string;
  status: string;
  createdAt: string;
  prazoResposta?: string;
  anexos: {
    id: string;
    tipo: string;
    nomeOriginal: string;
  }[];
  cidadao?: {
    nome: string;
    email: string;
  };
};

// A função formatStatus é passada como argumento para manter a função de download desacoplada.
export function downloadManifestationAsPdf(
  registro: ManifestacaoDetalhe,
  formatStatus: (status: string) => string
) {
  const doc = new jsPDF({
    orientation: "p",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;
  const lineHeight = 7;
  let y = 20;

  // Título
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("OUVIDORIA DIGITAL - COMPROVANTE DE MANIFESTAÇÃO", pageWidth / 2, y, {
    align: "center",
  });
  y += lineHeight * 2;

  // Linha Separadora
  doc.setDrawColor(200);
  doc.line(margin, y, pageWidth - margin, y);
  y += lineHeight * 1.5;

  // Informações do Protocolo
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("PROTOCOLO:", margin, y);
  doc.setFont("helvetica", "normal");
  doc.text(registro.protocolo, margin + 35, y);
  y += lineHeight;

  doc.setFont("helvetica", "bold");
  doc.text("DATA DE REGISTRO:", margin, y);
  doc.setFont("helvetica", "normal");
  doc.text(new Date(registro.createdAt).toLocaleDateString("pt-BR"), margin + 35, y);
  y += lineHeight;

  doc.setFont("helvetica", "bold");
  doc.text("STATUS:", margin, y);
  doc.setFont("helvetica", "normal");
  doc.text(formatStatus(registro.status), margin + 35, y);
  y += lineHeight * 2;

  // Assunto
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("ASSUNTO", margin, y);
  y += lineHeight;
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  const assuntoLines = doc.splitTextToSize(registro.assunto, contentWidth);
  doc.text(assuntoLines, margin, y);
  y += lineHeight * assuntoLines.length + lineHeight;
  
  // Descrição
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("DESCRIÇÃO", margin, y);
  y += lineHeight;
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  const descricaoLines = doc.splitTextToSize(registro.conteudo, contentWidth);
  doc.text(descricaoLines, margin, y);
  y += lineHeight * descricaoLines.length + lineHeight;

  // Dados do Cidadão
  if (registro.cidadao) {
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("DADOS DO CIDADÃO", margin, y);
    y += lineHeight;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text(`Nome: ${registro.cidadao.nome}`, margin, y);
    y += lineHeight;
    doc.text(`Email: ${registro.cidadao.email}`, margin, y);
    y += lineHeight * 2;
  } else {
    doc.setFontSize(11);
    doc.setFont("helvetica", "italic");
    doc.text("Manifestação Anônima", margin, y);
    y += lineHeight * 2;
  }

  // Anexos
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("ANEXOS", margin, y);
  y += lineHeight;
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  if (registro.anexos.length > 0) {
    registro.anexos.forEach((anexo) => {
      // Adiciona verificação de altura para nova página
      if (y > doc.internal.pageSize.getHeight() - margin) {
        doc.addPage();
        y = margin;
      }
      doc.text(`- ${anexo.nomeOriginal} (${anexo.tipo})`, margin, y);
      y += lineHeight;
    });
  } else {
    doc.text("Nenhum anexo enviado", margin, y);
  }

  // Rodapé
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.setFontSize(9);
  doc.setTextColor(150);
  doc.text(
    `Documento gerado em: ${new Date().toLocaleString("pt-BR")}`,
    pageWidth / 2,
    pageHeight - 10,
    { align: "center" }
  );

  // Salvar o PDF
  doc.save(`manifestacao-${registro.protocolo}.pdf`);

  toast.success("PDF da manifestação foi baixado com sucesso!");
}
