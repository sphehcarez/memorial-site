from reportlab.lib.pagesizes import letter, A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, PageBreak, Table, TableStyle, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY, TA_RIGHT
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader
import io
from datetime import datetime
from typing import Dict, Any
from PIL import Image as PILImage

class ObituaryPDFGenerator:
    def __init__(self):
        self.styles = getSampleStyleSheet()
        self.setup_custom_styles()
    
    def setup_custom_styles(self):
        """Setup custom styles for the obituary PDF"""
        # Main title style
        self.title_style = ParagraphStyle(
            'ObituaryTitle',
            parent=self.styles['Heading1'],
            fontSize=28,
            spaceAfter=20,
            alignment=TA_CENTER,
            textColor=colors.HexColor('#1F2937'),
            fontName='Helvetica-Bold'
        )
        
        # Subtitle style
        self.subtitle_style = ParagraphStyle(
            'ObituarySubtitle',
            parent=self.styles['Heading2'],
            fontSize=18,
            spaceAfter=15,
            alignment=TA_CENTER,
            textColor=colors.HexColor('#166534'),
            fontName='Helvetica-Bold'
        )
        
        # Dates style
        self.dates_style = ParagraphStyle(
            'ObituaryDates',
            parent=self.styles['Normal'],
            fontSize=14,
            spaceAfter=20,
            alignment=TA_CENTER,
            textColor=colors.HexColor('#6B7280'),
            fontName='Helvetica-Oblique'
        )
        
        # Section heading style
        self.section_heading_style = ParagraphStyle(
            'SectionHeading',
            parent=self.styles['Heading3'],
            fontSize=16,
            spaceBefore=25,
            spaceAfter=12,
            textColor=colors.HexColor('#166534'),
            fontName='Helvetica-Bold'
        )
        
        # Body text style
        self.body_style = ParagraphStyle(
            'ObituaryBody',
            parent=self.styles['Normal'],
            fontSize=12,
            spaceAfter=12,
            alignment=TA_JUSTIFY,
            textColor=colors.HexColor('#374151'),
            leading=16
        )
        
        # Quote style
        self.quote_style = ParagraphStyle(
            'ObituaryQuote',
            parent=self.styles['Normal'],
            fontSize=14,
            spaceAfter=15,
            spaceBefore=15,
            alignment=TA_CENTER,
            textColor=colors.HexColor('#166534'),
            fontName='Helvetica-Oblique',
            leftIndent=50,
            rightIndent=50
        )
        
        # Timeline item style
        self.timeline_style = ParagraphStyle(
            'TimelineItem',
            parent=self.styles['Normal'],
            fontSize=11,
            spaceAfter=8,
            textColor=colors.HexColor('#4B5563'),
            leftIndent=20
        )

    def create_header_footer(self, canvas, doc):
        """Create header and footer for each page"""
        canvas.saveState()
        
        # Header - decorative line
        canvas.setStrokeColor(colors.HexColor('#166534'))
        canvas.setLineWidth(2)
        canvas.line(50, letter[1] - 40, letter[0] - 50, letter[1] - 40)
        
        # Footer
        canvas.setFont('Helvetica', 10)
        canvas.setFillColor(colors.HexColor('#6B7280'))
        canvas.drawString(50, 30, "In Loving Memory of Dr. Edgar Chagwa Lungu")
        canvas.drawRightString(letter[0] - 50, 30, f"Page {doc.page}")
        
        # Footer decorative line
        canvas.setStrokeColor(colors.HexColor('#166534'))
        canvas.setLineWidth(1)
        canvas.line(50, 50, letter[0] - 50, 50)
        
        canvas.restoreState()

    def create_portrait_placeholder(self) -> io.BytesIO:
        """Create a placeholder portrait image"""
        img = PILImage.new('RGB', (300, 400), color='lightgray')
        img_buffer = io.BytesIO()
        img.save(img_buffer, format='JPEG')
        img_buffer.seek(0)
        return img_buffer

    def generate_obituary_pdf(self) -> io.BytesIO:
        """Generate the complete obituary PDF"""
        buffer = io.BytesIO()
        
        # Create document
        doc = SimpleDocTemplate(
            buffer,
            pagesize=letter,
            rightMargin=60,
            leftMargin=60,
            topMargin=80,
            bottomMargin=80
        )
        
        # Story (content) list
        story = []
        
        # Title page with portrait
        story.append(Spacer(1, 30))
        
        # Portrait image
        try:
            portrait_buffer = self.create_portrait_placeholder()
            portrait = Image(portrait_buffer, width=2.5*inch, height=3.3*inch)
            portrait.hAlign = 'CENTER'
            story.append(portrait)
        except Exception as e:
            print(f"Could not add portrait: {e}")
        
        story.append(Spacer(1, 20))
        
        # Main title
        story.append(Paragraph("HIS EXCELLENCY", self.subtitle_style))
        story.append(Paragraph("DR. EDGAR CHAGWA LUNGU", self.title_style))
        story.append(Paragraph("SIXTH PRESIDENT OF THE REPUBLIC OF ZAMBIA", self.subtitle_style))
        
        # Dates
        story.append(Paragraph("11 November 1956 - 5 June 2025", self.dates_style))
        
        # Memorial quote
        story.append(Spacer(1, 30))
        story.append(Paragraph(
            '"A leader\'s legacy is not measured by the years in office, but by the lives touched and the nation transformed."',
            self.quote_style
        ))
        
        story.append(PageBreak())
        
        # Professional Biography
        story.append(Paragraph("PROFESSIONAL BIOGRAPHY", self.section_heading_style))
        
        biography_text = """
        His Excellency Dr. Edgar Chagwa Lungu, the sixth President of the Republic of Zambia, passed away 
        peacefully on 5 June 2025 in Pretoria, South Africa, following complications from surgery. He was 68 years old.
        
        Born on 11 November 1956 at Ndola Central Hospital in the Copperbelt Province, Edgar Chagwa Lungu grew up 
        during Zambia's formative years as an independent nation. His early life was shaped by the aspirations and 
        challenges of a young African democracy finding its place in the world.
        
        Dr. Lungu pursued his higher education at the University of Zambia, where he distinguished himself as a 
        dedicated student of law. In 1981, he graduated with a Bachelor of Laws (LL.B.) degree, laying the foundation 
        for what would become a distinguished career in both law and public service.
        """
        
        for paragraph in biography_text.strip().split('\n\n'):
            story.append(Paragraph(paragraph.strip(), self.body_style))
        
        # Early Life and Education
        story.append(Paragraph("EARLY LIFE AND EDUCATION", self.section_heading_style))
        
        early_life_text = """
        Following his graduation, Dr. Lungu joined the esteemed law firm Andrea Masiye and Company in Lusaka, 
        where he honed his legal skills and developed a deep understanding of Zambian jurisprudence. His legal 
        practice exposed him to the challenges facing ordinary Zambians and instilled in him a commitment to 
        justice and the rule of law.
        
        In addition to his legal training, Dr. Lungu underwent military officer training at Miltez in Kabwe under 
        the Zambia National Service (ZNS), an experience that instilled in him discipline and a profound understanding 
        of national security matters.
        """
        
        for paragraph in early_life_text.strip().split('\n\n'):
            story.append(Paragraph(paragraph.strip(), self.body_style))
        
        # Political Journey
        story.append(Paragraph("POLITICAL JOURNEY", self.section_heading_style))
        
        political_text = """
        Dr. Lungu's entry into politics began in 1996 when he contested the Chawama constituency as an independent 
        candidate. Though unsuccessful in this first attempt, his political journey had begun. He subsequently joined 
        the United Party for National Development (UPND) in 1998, before eventually finding his political home with 
        the Patriotic Front (PF) in 2001.
        
        His persistence and dedication to public service were rewarded in 2011 when he successfully won the Chawama 
        constituency seat for the Patriotic Front, marking the beginning of his rapid rise through the ranks of government.
        """
        
        for paragraph in political_text.strip().split('\n\n'):
            story.append(Paragraph(paragraph.strip(), self.body_style))
        
        story.append(PageBreak())
        
        # Presidential Leadership
        story.append(Paragraph("PRESIDENTIAL LEADERSHIP", self.section_heading_style))
        
        presidential_text = """
        Following the untimely death of President Michael Sata in October 2014, Dr. Lungu emerged as the Patriotic 
        Front's candidate for the presidential by-election. On 20 January 2015, he was elected as Zambia's sixth 
        President, defeating his closest rival by a narrow margin and demonstrating the competitive nature of 
        Zambian democracy.
        
        Dr. Lungu was subsequently re-elected for a full term in August 2016, again in a closely contested election 
        that underscored the vibrancy of Zambia's democratic institutions. His presidency was marked by significant 
        achievements in various sectors of national development.
        
        Among his notable accomplishments was the historic appointment of Inonge Wina as Zambia's first female 
        Vice-President, breaking significant barriers and advancing gender equality in leadership. He also commuted 
        the death sentences of 332 prisoners to life imprisonment, demonstrating his commitment to human rights 
        and criminal justice reform.
        """
        
        for paragraph in presidential_text.strip().split('\n\n'):
            story.append(Paragraph(paragraph.strip(), self.body_style))
        
        # Key Milestones Timeline
        story.append(Paragraph("KEY MILESTONES", self.section_heading_style))
        
        milestones = [
            ("1956", "Born at Ndola Central Hospital"),
            ("1981", "Graduated with LL.B. from University of Zambia"),
            ("1996", "First contested as independent candidate in Chawama"),
            ("2001", "Joined the Patriotic Front"),
            ("2011", "Elected MP for Chawama constituency"),
            ("2012", "Appointed Minister of Home Affairs"),
            ("2013", "Appointed Minister of Defence"),
            ("2014", "Became PF Secretary General and Minister of Justice"),
            ("2015", "Sworn in as sixth President of Zambia"),
            ("2015", "Appointed first female Vice-President"),
            ("2015", "Established National Day of Prayer"),
            ("2016", "Re-elected for full presidential term"),
            ("2021", "Completed presidential term"),
            ("2025", "Passed away in Pretoria, South Africa")
        ]
        
        for year, event in milestones:
            milestone_text = f"<b>{year}:</b> {event}"
            story.append(Paragraph(milestone_text, self.timeline_style))
        
        story.append(PageBreak())
        
        # Legacy and Final Years
        story.append(Paragraph("LEGACY AND FINAL YEARS", self.section_heading_style))
        
        legacy_text = """
        Dr. Lungu's presidency concluded in August 2021 following his defeat in the general election. In a testament 
        to his commitment to democratic principles, he gracefully conceded defeat and facilitated a peaceful transition 
        of power, strengthening Zambia's democratic institutions.
        
        Even after leaving office, Dr. Lungu remained active in Zambian politics, returning to lead the Patriotic Front 
        and continuing to contribute to national discourse until his passing.
        
        Dr. Edgar Chagwa Lungu's life was one of service, dedication, and unwavering commitment to the people of Zambia. 
        His legacy as a lawyer, politician, and statesman will continue to inspire future generations of Zambians to 
        serve their nation with honor and integrity.
        """
        
        for paragraph in legacy_text.strip().split('\n\n'):
            story.append(Paragraph(paragraph.strip(), self.body_style))
        
        # Memorial Service Information
        story.append(Paragraph("MEMORIAL SERVICE", self.section_heading_style))
        
        service_info = """
        A State Memorial Service will be held on Saturday, June 14, 2025, at 10:00 AM at the National Heroes Stadium 
        in Lusaka. The service is open to the public and will be broadcast live on national television and radio.
        
        The service will include tributes from family, friends, colleagues, and dignitaries, as well as cultural 
        performances celebrating Dr. Lungu's life and legacy.
        """
        
        for paragraph in service_info.strip().split('\n\n'):
            story.append(Paragraph(paragraph.strip(), self.body_style))
        
        # Final quote
        story.append(Spacer(1, 30))
        story.append(Paragraph(
            '"We gather not to mourn what we have lost, but to celebrate what we have been given - a leader who served with dedication, a man who loved his country, and a legacy that will inspire generations to come."',
            self.quote_style
        ))
        
        # Build PDF
        doc.build(story, onFirstPage=self.create_header_footer, onLaterPages=self.create_header_footer)
        
        buffer.seek(0)
        return buffer

# Initialize the obituary generator
obituary_generator = ObituaryPDFGenerator()
