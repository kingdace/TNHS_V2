<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\SchoolInfo;

class HistoryOverviewSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create or update the main history overview record
        $historyRecord = SchoolInfo::updateOrCreate(
            ['info_type' => 'history', 'title' => 'History of Taft National High School'],
            [
                'content' => json_encode([
                    'title' => 'History of Taft National High School',
                    'description' => "History of Taft National High School\n\nTaft National High School (TNHS), located in Barangay Taft, Surigao City, was officially established in May 2003 through a Memorandum of Agreement signed by then City Mayor Alfonso S. Casurra and City Schools Division Superintendent Dr. Rizalina S. Bayon, CESO VI. Initially functioning as an annex of Surigao City National High School (formerly San Juan National High School), the school was temporarily housed at Mariano Espina Memorial Central Elementary School (MEMCES) along Navarro Street, with MEMCES Principal Mr. Bel T. Cencia assisting in student enrollment.\n\nThe school was aptly named after its host barangay and opened its doors in June 2003. Mrs. Vilma L. Gorgonio was appointed Officer-in-Charge by SCNHS Principal Dr. Edgardo M. Cortes, alongside the pioneering teachers: Mrs. Jennefer L. Natonio, Mrs. Lany G. Petallar, Mr. Manuel B. Dayondon, Mrs. Marichi P. Higayon, and Mrs. Norma Morales.\n\nDespite limited facilities, the school welcomed an unexpected 206 students in its first year, prompting the recruitment of additional faculty. By the end of SY 2003–2004, TNHS had eight teachers.\n\nIn 2004, Mrs. Gorgonio was promoted to Teacher-in-Charge, and to accommodate rising enrollment, double-shift classes were implemented from SY 2005–2006 to 2006–2007. Classes ran from 6:30 AM to 7:00 PM in two shifts.\n\nOn January 8, 2007, TNHS transferred to a new location in Nueva Extension, Surigao City, with two concrete classrooms and eight temporary bamboo (Amakan) structures. Over the next 12 years, enrollment surged to over 1,080 students, supported by improved infrastructure that included nine buildings and 11 classrooms.\n\nThe school's operations were backed by DepEd Government Permit (R-XIII) No. 86 s. 2004. From 2004 to 2014, Mrs. Gorgonio led the school, followed by Mr. Alejandro O. Ignalig until April 2015. On May 4, 2015, Mrs. Maria B. Meñoza, a veteran educator with 31 years of service, assumed leadership and oversaw significant growth, including an increase to 38 teachers by SY 2016–2017.\n\nThanks to support from Mayor Casurra and the City Government, TNHS was granted a 19,915.33 sqm lot (Lot 7236, Cad-234) for expansion, enabling the addition of outdoor and sports facilities.\n\nDuring SY 2018–2019, under Dr. Thelma Tolentino (Principal II) and Dr. Vonn B. Fabello (District Supervisor), two new two-story buildings were constructed. In February 2019, Dr. Trinidad T. Pulvera took over as Principal II. When the COVID-19 pandemic struck in 2020, TNHS quickly transitioned to modular learning to ensure continued education.\n\nThe school faced a major challenge when Typhoon Odette struck in December 2021, damaging facilities. However, with assistance from government officials and stakeholders, the school recovered. Congressman Ace Barbers later funded the construction of a new covered court to support physical education and school events.\n\nBy 2023, TNHS had become a hub for key division activities, such as the Retraining of Athletes for the Regional Meet, further strengthening its reputation in athletics and leadership.\n\nThe school's steady growth culminated in 2024 under Dr. Flordeliz Flores (Principal) and Atty. John Benedict Entrada (Assistant Principal), who successfully hosted the National Leadership Conference (NLC) 2024 at TNHS. Their vision advanced both academic and extracurricular programs.\n\nOn October 21, 2024, new leadership under Dr. Manuel B. Dayondon and Mrs. Mary Ann E. Gubaton brought renewed momentum. They initiated the construction of Science and Chemistry Laboratories and integrated Khan Academy to enhance personalized learning. Their commitment to academic excellence and holistic development is laying the groundwork for a future-ready school.\n\nOn March 10, 2025, the Department of Education Regional Office, through the leadership of Regional Director IV Maria Ines C. Asuncion, officially granted Taft National High School the Approval to Operate two additional Senior High School programs under the Academic Track:\n•\tScience, Technology, Engineering, and Mathematics (STEM)\n•\tHumanities and Social Sciences (HUMSS)\n\nWith this milestone, Taft NHS will begin offering the new programs starting June 2025, further expanding its Senior High School curriculum and strengthening its commitment to providing diverse and future-ready educational opportunities for its students.\n\nToday, Taft National High School continues to thrive as a center of educational excellence in Surigao City, guided by committed leaders, dedicated teachers, and an engaged community.",
                    'established' => '2003',
                    'location' => 'Surigao City',
                    'facts' => [
                        'Over 20 years of service',
                        'Thousands of graduates',
                        'K-12 compliant',
                        'Community-centered',
                        'STEM & HUMSS Programs',
                        'Modern Facilities',
                        'Leadership Excellence'
                    ]
                ]),
                'is_active' => true,
                'display_order' => 1,
            ]
        );
    }
}
