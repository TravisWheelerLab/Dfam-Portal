import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DfamAPIService } from '../shared/dfam-api/dfam-api.service';

@Component({
  selector: 'dfam-search-sequence',
  templateUrl: './search-sequence.component.html',
  styleUrls: ['./search-sequence.component.scss']
})
export class SearchSequenceComponent implements OnInit {

  constructor(
    private dfamapi: DfamAPIService,
    private router: Router,
  ) { }


  static example = {
    sequence: `>Example Search
TTTTATTTTATTTTTAGAGAAAGGGTCTTGCTCTATCACCTAGGCTGGACTGCAGTGGTG
CAATCACAGTTAACTGCAGCCTCAACCTCCAGGGCTTGAGCAATATTCCCATCTAATTTT
TATTTTGTTTAAGAAATGCAGTCTTGCTCTTAGCAAAGCTAAAGTGCAATGGTGTGATCA
TAGCTTACTGCAGCCTCAACCTTCTAGACTCAAGTGATCCTCCAGTCTTAGCCTCCCCAG
TAGCTCGGACTACAGGTGTGCACTGCAACGTGTAGCTCATTTTTTTTTTTTAATTTTTAG
TAGAGACAAAGTGTCACTATGTTGACCAGGTTGGTGGTGATCTCCTACACTCAGGCAGTT
CTCTCACCTCAGCCTTCCAAAATGCTGGGATTACAGGTGTGAGCTGCCACACCTGGCTGA
GGGGGTTAATTTTTAATTATATAAAGAGCTCAAAGCAAATATTAGAAGGAGCCTAAATGC
CTCCAGCAGTTGACTGGTACTGGTAAATTGTGATACATCCATATAATAAAATATTATGCA
ACCATGAAAAGGATTAAGATAGATCAATAGGTATTGGCACAAATGTCCACGAAATATGAA
AATATGAAGTGATGTTCAATCACCATGTACGTATCTTGAAGGATATGGCCCATTTTCTCA
ACTGCAATTATTTCCTGAGATAAGATTATGGGTCTAAAGAGTGAAGGACATTTTTCACTT
ATTTAAAAGTATTTATCATTTTTATAATTTAATAAAAGATTAAACAGATCATTGAATTAG
TAAAAGACAAAGTAACTCTATAAATAAATGGAAAAGACACAGATACCCCAGGCATGGTGG
CTCATGCTTATAATACCAGTACTTTGGGAGGGGGTGGTGGGGGGATTGCTTGAGGCCAGG
AGTTCCAGACCAGCCTAAGAAACAAAGCAAGACCTCCTCTCTAGTAAAAATAAAAAAATA
AAAATAATTGGCCAGGCATAGTGGCATGTGCCTATAGTCCCAACTACTGAGGTGGAAGGA
TCACCTGAGCCTAGGAGGTCAAGGCTGCAGTGAGTTGAGACTGTGCCACTACACTGAAGC
CTAGGAGACAGAGCGAGACTTCATCTCAAAAAAAAAAAAAAGGACAATAAAGAAATAAAG
CTAATAAGCTAACATAAGGAAAGATAAAATATGTGACAAATAGGCTGGGCACATGGCTCA
CAGCTGTAATCAAGCACTTTGGGAGGCCAAGGCGGGTAGATCTTGAGATCAGGAGTTCGA
GACCAGCCTGATCAACATGGTGAAACCACGTTTCTACTAAAAATACAAAAATTAACCAGG
CATGGTGGCATATGCCTGTAATCCCAGCTAATAGGAGGTCTTTCATTTATCACACAGAAA
ATAACTTGTTAAATTATAATACCTGTGTGGGCGAAGGTGCAGTGAAATGGCCATTTTCTT
GTAGTATTAGTGGTGTTTAAAATGTATATAAGCCTTCCAGCATAAAGCTTGGAAATTTTT
TTTAAATCATACAGACAGTGACTCATTATACTGCCTCCTCCAACTCCTGGCCTCAAGCAA
TCCTCCCACCTCAGCCTCCCAAAGTGCTGGAATTACAGGCTGACAGCCACCATGCCTGAA
AGCTTTGCAATTTACATCGAGGGTAATAAGAATGCTCATGCCCTGTGACTCACAGTAATC
TCACTTCTGGAAATTTCACCTTTGGATATAATTCAACCTAAACAAAAGGTCATATGCACA
AACACAGTGAAAATCTGGGAGTAATTTTTTTCTCTTTTTTTAAAAAAATATGGAATGCTT
CACAAATTTGCATGTCATTCTTTCACAGAGGCCGTGCCAATCTCTCTATTGTTCCAACTT
AAGTATGTGTGCTACTGAGGCAAGCATGAGTAATTTAAGATAGGGTGGTTAAGTGAAATA
AGGAAGAATTATGGAGAATTTAAAAATCTATGCTATTTATAGGCACCTAGTAACAGCTCA
GTAAATATTAGCTGCTACTATTATTATTTTTATGGTAATTTCACTCAATTAAAAACTGTC
GTTAAAAATTGCCATTGTCATGGAACATAATGTCTCCTACTGTATAATTGTAGAAACAGA
TACAATTTGTCCCTTGGTATATGGGGGGATTAGTTCCAGCTCTCCCATTTCTGTGTATAC
CAAAATCCACGCATACTCAAGTTTTCAAAGTCAGTCCTGTGGAATCCACATATAACACAA
ATGGGAAAATTAGTGAGGTGTGGTGACAAGCACCTGTAGTCCCAGCTACTTGTGAGGCTG
AGGCAGGAGGATTGCTTGAGCCCAGGAGGTTGAGGCTGCAGTGAGCCATAATTGCACCAC
TACACTCCAGTCTGGGCAACAGAGTGAGACAGAAGGTTGACTTTTTAATAGAATTTTTCT
GTTCACTTGAAGATATGGTCAGGATTGTGGCATATGAAAATTCTTCATAAAATAACTATC
TAATCCAATTAATGCTGGAATTGGGAACAGCAGAAGTGTCATCTCAGAGCTACTCGCAAT
GAAAGGTGATGTCTGGGGCTCAGGTGTGTTGAGGTCCCCATGCCTGGACTATGGGTGCTG
AGTGGGATTTACTTGTCCATCCATTTTCTATATTCCAGCACTGGGAAACTAGGGACAGTA
CTTGTTCTCAAGGGAATCTTCAGCTTAGGTGGCTCTGTAAAAGAGAAATTACATCATTGA
AAAATCGTCGCAGGTCAGGTGAGGTGGCTCATACCTATAATCCCAGCCCACTGGGAGACT
AAGGCAGGAGGATTCCGTGAGGCCAGGAGTTCAAGACCAGCCTGAGCAACACAGTGAAAC
CTCATCTCTACAAAAAATTAGAAAATGAACTGGGTGCGGTAAAACATTCGTATAGTCCCA
GCTACTCTGGAGGCTGAAATAGGAGGATCGCTTGAGCCCAGGAAGTGGAAGCTGCAGTGA
GCTCTGATCTCACCACTGCACTCTAGCCTTGGTGACAGAGTGAGACCCTGTCTCAAGNNN
NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNCCCCAATCTCACTCTGTCCAGCCTTGACT
AATCAAAAGGGCCTTCTGGTTACAGAAGAGGTATGCTCTTTTGTAGGACAGGGAGAGACC
AGCAAGCTTGTTCACAGACTTTTCCTCATCCTCTGCTTAGTTTTCCAAGAACCCTCACAG
TGGAAATGGAGTCTCTGGGAAAATGACCTAAATCTTTGGGTTACCAGGGGAGAAATATGC
CTCCTTTGTCAATTAATAAATGGAACATCTGCCTTAAAATCCAGGGAGTTCTGCTAGAAT
GAATCACTCCCTAAGACCCTGACCAATGCATGGAACATGAAAAACTGAAGTTTAACTGGG
CGCGGTGGATCACGCCTGTAATCCCAGCACTTTGGGAGGCTGAGGCGGGCGGATCACCTG
AGGTCAAAAGTTCTAGATCAGCCTGGCCAACATGGTGAAACCCCGTCTCTACTAAAAATA
CAAAAATTAGTTGGGCATGGTGGTGGACACCTGTAATCCCAGCTACTTGGGAGGCTGAGG
CAGGAAAATCGCTTGAACCCGGAAGGCGGAGGTTGCAGTTACTTCTAGAAGAATTTCCAT
TAGCCCTTTGAAATCCTTCAACATTCATGAAGGCCAAAGAGTTTTCACCTAATTTAATCT
GATGGGTATGTGACCAGAGTCTTTCTAGGGAATAGAGACTCCCAAACAGTTCGACTGGGA
AGTGAGGAGAGAATTTATTACTCAAAACCAAAGGGAAATGAAAAGAGGCCAACATAGAAT
GTCATTATTCTTTCTTGGCGGGGAATGGATTCCAGAGTCATTCTGTGACCTTTACATGAC
CTCCTTATTAGCATCTAAAAGCTTCCAGTGTAGGATGCAGCCAGCTAGGTTCTCTTCTAA
TGTAATAAAATTTGCTTCGGCAAATCTTATGCAGAGCCATCTCCAGGCTCCAGAAACAAT
AGGCTATAAATTACTGGATCTCCCATTTGATACAATGAAGTATGAGCATGGTCCTGAATG
ACTCCTCTACATACTACTCTGGGTGGCTTGAAGTGAATTTGATACAAGAACTGGAGCGAG
GGCAAAGCAGAGCTAGATCTAGGATTAATGTGCTTGGGCCCAGCTCCTCACTACTCACCT
ATGAGTCTAGTTCCAGAACCCAAGTAGAGGATGGGGAAACAAGGCTCCTGACTTTTTTTC
CCTAATATCTGCATCTCTTTCACATTTCTTATCTCCTTGCAAAGAAACTAAACAGGCTCA
ACTGAAATAACTAAATGATTAAACCCTATACAGAGAATCTCCAAAGACTGACAAAATATC
ATTCAAGACTGTTACACAGACAACCTTGAGGATGACTTGATGTACCAGTGATCTACAATA
TTTGGGATCATTCCAAATTCCCATCAAGGATCTGCCTATATCAACAAAGGAGCCAAGGAC
CAACCATTCAAATGGGCCCTGCTGCCAAGCCTTTTTTTTTTTTTTTTAACAATGCCATCT
CTTCATATTGTTCCATTTAACAAAACTGCAGCCCTTCATCTATCCTTAAGTCCCTTGGCC
AGTGGTACAGAGCCAGAGTATGCTACTCCCTAGCAGGAAATCAACAGGATGACCTACTAA
ACACCATTCAGAAGATGCTAAGACCCATGAATTGCAACAGGAAAGAAAAGACAGAGAATT
AGTCAGACAGGTACATGCTGTGCCAAAAGTGCACTACAGCCCCCACCCAATTCTGCCTAA
TCCTAGCTGGGCTGACACCAACCTGATGAGACAGGCCTATAAGATCTCAAACTAAAACAG
AAACTCCTGAACTGGGTTCTTTCGAGCCCAGGAAGCAGCAGTAAATCATTAAAGAACAGA
TAAGTTCTTAAGGTGAGGGAGAGTTTCAGATAAATGGAATGCTGGTAGAACACAGGGCCC
AAAGGAGCAAAAGTTAACCTAAGCCCAGGTAGAACCTTGTTTACTAGAGTATTAGGCATG
GGTTTGGGCAACTATTCTAACCAGAGAAACTGGCTTCAGTGAGGGCAAGTTGGCAATCCA
AGGTATAGCATGCATAGGGCTGGCAAAATTCAGGGTGACTGAAGCAAAAGCTTCATAACC
AGAAAGACCACATCTGGGGGTAGAGCACAAAACTCTCAAGAGATGAATCTTTGTAAGAGT
GAGGCAGAACTATATAGCAGTTTTAGGAGATCTGTTGGTGCCCAGCAAGAGCTCCAAACG
GGCTATATGCAGGGATGCAGGCTGTAGTCTCAGGAGAGGAGGTTCACAAAAGTCATTCAG
TCCAAGACCTCAAACTGTGTTCTCTACTAAAAGGAATCAAGGTTCCCTAGAGAAATGGCT
GACTCCATGTATGGTGCAGTATATTGATCCTGGAACATCTGTTTTGCCAGAAAGCAAGGA
AGCCATCAAAGTCCAACAGGATCACTTCAAAAAGACATGAAAGTCAACTTGAAGAGATAA
TTATTAACCTAGATGAGACAATCTAAGCATCCAAAACAATAAAGACTGCAATGGCCTGAA
ATACATCAAATGCAAACAATAATCTATGAGTTCATAATGGTATTCAGAAAAAAAAACTAC
TGGTCATTAGAGGGAAGGTTACTAGGTCACTAACTTACTACTCTGAAAAGTGACTTAAGA
TGAGAGGTAGGGTGGAAAATTAGCTATTTATTCAGTCTTTCCTGTACAAACATAAATTTT
TAGGGAGATTGAAGCAGATGAAACAAATCTGGAAAAATGGAGGTAACTGCTTAATCTGCG
GGTTGGGTGCATGGAGGTTCAACATATTTCTTTTGTGTATATTTGAACCCCCTACAAAAA
AAGCACAAGAGAGAATGTGAGCCAAGCAGCTTAGGGTTTAGGCAAGGCTTCTGCCTACAA
GAGACACTAGGATATGAGGGGTAGTTTTAGCCCTAATGGGCTGAGCCAACTGGAGGTATA
TAGGGAAGTGCTAAATTGCAGAGGTATCATGTTGCCCAGCACTTGATCAAATCCTAGATC
CTAGGTCTGCTTGGTAGCATGCTTCCTAGGTAGTGGATCTGAGGCTACCTATAGAACTTC
CTTTGCAGTCATAGTTCGCTCAGAAACTACAAAAGTGCTTGCTCTTGAAAATGGAGTCTT
TGTCCATTTCATGCTTCTATAAAAGAATACCACAGACTGCATAATTTATAAAAAGGAAAA
AAGGAAGGAAAGAAAAAAGGAAGGGAGGAGGGAAGGAGGGAAAAAGGGAAGGAGGGAAGG
AAAGGAAGGAAGGGAAAGAAGGAAAGGAAGGAAGGGAAAGAGAGAAAGAGGGAAGGAGGA
AGGGAGGGAAGGAGGGAGGGAGGGAGAGAGAGAGGGAGGGAGGGGAAGGGAAGAAAAGGG
AAGAGAAGGGAAAGGAGGAAGAAAAGGAAAGGAAAGGAATAAATTTTATTTCTTAACAGT
TCTGGATGTTAGGAAGTCCAAGGTTGAGGGGCCTGCATCTGGTAAAGGTCTTCTTGCTGC
ATCATCCCACTACAGAAGGCAGAAGGAAAAGAGAGTGCAAGAAAGCAAGAGGGCAAAAGG
GGCTGAACTCTGTTTTATAATAAGCCCACTCTGTGATTACTAATCTATTACCACAATAAC
AACATTAACTCATTCATGAAGGCTATTTTATTAGGCCCCACATCCCAACTGTTGCATTGA
GGATTGAGTTTCCAGCACATAAACTTTGGGGGACACATTTAAACCATAGCAGAGCACTTA
GGTTAATTCAACTAAGAGGAGCTGGGAAAATCAAAGGCATGAGAAAGACAGCAAAAGCTA
GCAGAGAGAAATGCATAGGTTAAGGAAAAAAGTCACAGTGAATCCTGTAGTGCAGGCTAC
TTTATGAAAAGCACCTAAAAAAGATCTCATTAACTCCCCCAGCTCACCTCCACGCACATC
TAAAGAGCCACACACAGCACCACCAAAGGCAGCACAATGAGAACAGCATTCTCCTCAACA
GACAAGCTGGGAGTATCTAGACACCCGACCTCAATAGCTCCAGAACAGCCCTAAAACATT
TCCTCCCTAACCACCACTCAAGTCACCAGCTTGGAAAGTATTAAGAAAACCCAAATCCTG
ACACACCACTATGAAACAACTTAAAACAGCAAAGAACAACCCATTTAAACAGCAATGCCA
GCTGTTGGGAAAAAAAGGAACAATGAGTAGAGGAGAAACAGACCTCTCGGGGTCCACCAA
GACCCAGTCTCTCAGCTTCAGCACTTTTAAATGCAGAATCCATACCCCTCTGGGGCCTGT
GGAGCTCCACAAGGCATGTCGTCCTCAAAGATAAATGAGCAGGCAAGCTGGCTAGAAAAC
CACTAAGGGTATTTATTCTTTAAAGAATCTTTACAGGGTCAAAGAAGAATGGGTCTTAAC
TGGCTATGTGAACTCCCCACAGATTCTGAGGATGATGTCAGTATCCCTTTCCAGATGTGT
TTAACACTTTGCAGTCACTTGTATTCCTGCTACTGAGTGCCAGTGCTTTGCTAATTTGAA
CTGATTCCAGCTCACGCTGACCCCAGCTCCCTGGATGTTACCATTAGCCAAGACTGTCAC
CCATACTGTACCCTTTCAAAGAGTCCTAAAAACAGCTCTTCACCTACTCTTCCAAGACAA
GTAAAAATGTCTGCCAAAGAAATGGGGAAAAAAGATTCAGAGAGTGAAAACAATTAATAT
ACTAACAAGAGAGCAAAAAGCAAAGGGGGAGGAGAAACTAGGAAAATCATATATGGGCTC
TCACCTATTTCCAAAGCTGGGCTAATGTCCTTTTGCTTGTGTCTGAATAAGGCACCAATT
TTAAGCTGATAATGAAAAAAAAAGAAAAAGAGAAAGAAGCAGGCCCAGGCTGGGCGCAGT
GGCTCATGCCTGTAATCCCAGCACTTTGGGAGGCCGAGGCGGGTGGATCACCCAAGGTCA
GGAGTTCTAGACCAGCCTGGTCAACATGGTGAAACACCATCTCTACTAAAAATACAAAAA
ATTAGCCAGGCATGGTGGCGCATGCCTGTAAATCCAGCTACTAAGGAGGCTGAGGCAGGA
GAATTGCTTGAACCTGGAAGGCAGAGAATGTGGTGACCTGAGATCACGTCATTGCCCTCA
AGCCACGGCAATGAGAACAAAATTCGGTANNNNNNNNNNNNNNNNNNNNNNNNTCACCAT
AAAATAACTCAGACTTAATTAAATACAACCCTAGTGGTGAATGACTAAAGATGGATTACT
CATAACAGAGACAACAGTCCAATAAGAATCCAGGAATCTTACCTTTTAATAACAAAAAAA
TCCTTTCCTTCTAAAGTAACATCCTCTCAAGGCCAGGAATTCCATTAGTAGAAAGCCTTC
CTAAAAAACAAAATTCCTGGCCAGGCATGGGTTCACGTCTGTAATCTCAGCACTCTGGGA
GGCCGAGGCGGGAAGATCACTTGATATCAGGAGTCGAGGCGGGAAGATCACTTGACGTCA
GGAGTTCGAGACTGGCCCGGCCAACATGGTGAAACCGCATCTCCACTAAAAATACAAAAA
TTAGCCTGGTATGGTGGTGGGCACCTGTAATCCCAGTGACTTGGGAGGCTAAGGCAGGAG
AATTTCTTGAACCCAGGAGGCAGAGGTTGCAGTGACCAGCAAGGTTGCGCCATTGCACCC
CAGCCTGGGCGATAAGAGTGAAAACTCCATCTCAAAAAAAAAAAAAAAAAAAAAATTCCT
TTGGGAAGGCCTTCTACATAAAAATCTTCAACATGAGACTGGAAAAAAGGGTATGGGATC
ATCACCGGACCTTTGGCTTTTACAGCTCGAGCTATAAGAAAAAAAAGAAAAAGGGATATC
ATTTAAACACAGTATGTAGAAAAGAATAATTATTGAATCTGTACTGGTCTTTAACTTTTA
CACTTTGATCTTTAATTCTGTTATTGTGATTGAGTCCAAAGAAAAACAGTATGAGTAAAA
TAAAAAGAACACCAAAAATGCTAATATTCTGTTTACCGAAGTCTGTAGTGAAATATCCCA
TTAAATCCAAGTGCAGTGACACACCCATAATCCCAAGCACTTTGGGAGGCTGAGGCGGGT
GAATCTCCTGAAGTCAGGAGTTCAAGGCCAGCCTGGCCAACATGGTGAAACCCCAACTCT
ACTACAAATACAAAAATTAGGCAGGCGTGGTGGCAGAGGCCTGTAATCCCAGCTACTTAG
GAGGCTGAGGCAGGGAGAATTGCTTGAACACAGGAGGTGAGCTTGCCATGAGCTGAGATC
ATACCACTGCACTCCAGCGTGCGTGACAGAACAAAACTTCAACCTCCAAAAAAAAAAAAA
AAAAAAAAAACAGCTAGCAGGTGACATTTGCTATAGGGAGACTAGGGATATGATCTTGCT
GCAATCTTTCCATTTTAGTAAATCTAAACAAGTGTGAATCCATTCTGTTTCGTCCCCACT
CCACTCCAGAGCCAAAACAAGAAAAACAATTATATTTCTAGTTCTTTAAAAACATATCTA
ACTAAATCATCTAATTAAAAGATAATATGCATGGTTCCATACTCTAAAAGAAAACTTATG
TCCTGCATATCATGGACATTTGATGAATGCTTATTCAGTTGACTGGTGTAGACTTCAATA
ATAACCTGTTCAATGCATTATGCCAGATGAATCTTGCATCTCAAAAGTAGAACAAATATT
GTTCTTTCAGTTTTGTCTACCCATAAATGCAATATTTACTAATAAAAAGAAAATGAGTTT
ATTGTTCTAGAGAGTATGAGAATTTTGACAACATGAATTCTCCTGTCCTAGGACATAATT
AATACTTAGAGGCATACTATTTCATGTGGAAGCTACCATTAAATCAATGTTAAGTGTTAA
TTACCTCACATAATCTTCTAATCTGACTTGACTGAAGACGTACCTGACAAAGTTGATTTA
TCAAGTTGTAAATCTTCACCTGTTGAATTCATAAGTTCATGTCTGAAAGGTGAGAATAAA
TACTTAATATTCATTAGGCAATATTCAGCAAAGTAATATCCACTAGTACATATTTAATAT
TTCATCATGAACTGCGGGTGTGAAGAGAAAGGACAGGCTGGGCACAGTGGCTCACACCTG
TAATCCCAGCAGTTTGGGAGGCCGAGGCAGGCAGATCATGAGGTCAGGAGTTCGAGACCA
GCCTGGCCAACATGGTAAAACCCCGTCTGTACTAAAAGTACAATAATTAGCTGGGCATGG
TGGCAGGCACCTGTAATCCCAGCTACTCGGGAGGCTGAGGCAGGAGAATTGCCTGAACCC
AGGAGGTGGAGGTTGCAGAAACCATTATCACGCCACTGCATTCCAGCCTGGGCAAGAGAG
CAAGATTCTGTCTCCATCAATCAATCAATAAAAATATAAGAAGGAAGCATTTACTGTGTA
TTTATATGTCTGGTATTATGTGAAGCACTTTACTATCTTATCAAATCTTCGGGACAGATC
TTCAGTTCTCATGACCACAAAAGAGGATACTAAAGCTCAGACAGGAGAAGAGACGTGGCC
AGCCTGTGTCCCCAGGGCCTATGGTCTTACCACTAGGTTACAGTGTTTCCAGATATCACA
TGTTGTGAGATTTTTGCTTTAAAATGAACCAAAAAAAAACCAAAGGTGAAAAAGGCATAA
GCTATTAAAAAGTGGGAGAAACACTAAGAGAACCTTAAGCATGTAACTAAAAATATTATG
GAAATGTTATTGAATACATTAGCAAATTTAGTGCTAGGTTTTCATTGAGGAGTAGGTTAT
ATTACTCATGATGAAGAAAAATGTTCATTTTAAGTATATTAACATAAATACCATCAATAT
TGTTTATCATGTTTAAATGTTCACTTAAAGCAATTCAGTTAAAATTCTGCATATCATACA
ATTTTATAGTTTGCTAGTAGGTTACAAGTAAATAGTCACCCAAATAAAAACATCATGTTT
TCCACTGGTTGTTGCTCTTTTTTAGGTGAGTATTTGATATATACCAACAGAGAGAGGATA
ATAACAAATCGCTAATTTCTTTCATCACTATATAAAGGTGGCTTCAGGATAGAATAGTAT
CAGTGTAATGATGAATTTGAAATCTAACATCAATTCAGTGATGCATCAAGATAAAAGTAG
AGACAACAGGGGCACCTTGGTGAGTACTGAACATTTTATTTATTTATTTATTTTGAGATG
GAGTTTTGCTCTTTTTGCCCAGGCTACAGTGCAATGGTGCCAACCTCGCCTCACTGCAAC
CTCTGCCTCCTGGGTTCAAGCGATTCTCCTGCCTTGGCCTCCCGAATAGCTGGGATTACA
GACATGCGCCACCACACCCGTCTAATTTTGTATTTTTAGTAGAGACGGGGTTTCTCCATG
TTGGTCAGGCTGGTCTCGAACTCCCGACCTAGATATCTGCCTGCCTTGGCCTCCCAAAGT
GCTGGGATTACAGGTGTGAGCCACCACGCCCAGATGAATTCCAAATTTAACAAAGCAGAC
TAAGAGAAACAATTCATTTAAAAAAATAATATTTGGCCAGGCATGGTGGCTCACACCTAT
AATCCCAGCACTTTGGGAGGCTGAGGTGAGTGGATCAGGAGGTCAGCAGTTCAAGACCAG
CCTAGCCAAGATCATGAAACCCCGTCTCTACTAAAAATACAAAAATCAGCCAGGCGTGGT
GGCTGGTGCCTGTAATCCTAGCTGCTCGGGAGGCTGAGGCAGAGAACTGCTTGAACCCGG
GAGGCGGAGGTTGCAGTGAGCCGAGATCGTGCCACTGCACTCCAGCCTGGGCGACAGAGT
GAGGCTCCGTCTCAAAAAAAATAAATAAATAATTCAATGAAATTCCTAAGATCCAGGGCT
TTGCAATAAATATGTAAATAAATTTCCAATCTCCATACTGAAAGTTTAAAAGAAATGCTA
ACTAATAACTAAAGAAATACAACTTTTCCTCAGCTTTGCAGCAATCTAGAAACAAAGTGT
GTAGACACTACAAAGCACCTTACAAGGAGAAACATGTAAGGATGGCATGACTCGCCGGCA
GCCCTGGGATTGTCCACGGTACCCCCATGATGAACAGTAACTCCACTGTGTAAACGCCCA
TGAACCTAAGATTACAAGACTTTTCCAGTTTAGACATACCATATTTTCTTTCAGACAATT
CTTCAGTTTGTTTACGTAGATCAGCGATACGATGATTCCATTTCTCTGAAAACCAAGCAA
AAGTTGCTTCTCAATAACACGTCCCTATGTCAGAGCAGCACTAACATATAATGACTGATT
TCATATATTTTACATTCTAACAGTCCATATCATTTTACTGCTTTCAAGAAAAAATTTCCC
CTTCTTGGTGGTTCTTAGAATTGGTTTAATGGGAGACTATTAGAGAAGCTGAAAAGCAGG
AGGGCAGAAAAGCTCAATCAAATTAAACACAATAACAGGGAGGTCACAATGAGGCGGTCT
CCAGGGGTCTTTTAGCAAACTTCCTAAAACATGTCTCAGCTGTGTGAAATAAGACTTTAC
AGCAGCCGGGTGCAGTGGTGCAGGCCTGTAATCCCAGCACTTTGGCAGCAGAGGCAGGCG
GATCACTTTGAGCTCAGGGCAACATAGCCAAAACCCCCCTCCCTAGCCCCACCCCCACCC
CGTCCCTACCAAAAATACAAAACAGCAGGGCATGGTGGCGGGCGCCTGTAGTCCCAGCTA
CTCAGGAGGCTGAGGCAGGAGAATCACCTGAACCCAGGAGGCAGACATTGCAGTGAGCCA
AGATCACGCCACTGCCAGCCTGGATGACAGAGCAAGACTCCACCTCAAAAAAAACAAAAA
CAAAAACACAAGGTTAAGAGGGACCCCCGACCTTACAGATACAAGTTTAAGAGGGACCCC
TAAGCAAAAAATGCCAACCCTTTTTCTCCCAATCATTGAAACACCAGGAGGGTGTAACAG
TTTTGCAGCCTAGCTGTAGCAGGCTGATGCCCCCAAGATGCCCATATCCTAATCCCGGGA
ACTAGTGAACATGACCTTATATGGCAAAAGGAACTTTGCAGATATAATGAAGTTAAGGGT
CTTTGGCTTTTGGGGTTGATGTACTCACTCGGATCCTTGTAAGAGCAGAGCAGGTGATGG
AGAGGGTGGGAGGTGTAGTGACAGAAGCAGGAAACTCCAGTCATTCGAGACGGGCAGCAC
AAGCTGCGGAGTGCAGGCCACCTCTACGGCCAGGAAACGGATTCTCCCGCAGAGCCTCGG
AAGCTACCGACCCTGCTCCCACCTTGACTCAGTAGGACTTACTGTAGAATTCTGGCCTTC
AGACCTGTAAGGGAATACATTTTGGTTGTTTTAAGTCACTAAGTGTGTGGTAATTTGTTG
CAGCAGCCACAGGAAACTAGTATTGTAGTGAAGCCTCAAAACCCCCCTGAAGGGGCTGGG
CTCAGTGGCTCATGCCTGTAATCCCAGCACTTTGGGAGGCCGAGATGGGTGGATCACTTG
AGGTCAGGAGTTCGAGACCAGCCCAGCCAACATGGTGAAATGCCATCTATACAAAAAATA
CAAAAACTAGCCGGGCATGGTGGCACATGCCTGTAATCTCAGCTACTCAGGAGGCTGAGA
CAGGAGAATTGTTTGAACCCAGGGGGGCAGAGGTTGCAGTGAACTGAGATTCCACCACTG
CACTCCAGCCTGGGTGACAGAGCGACGCTCCATCTCGAAAACAAAACAAAACAAAAAAAC
CCCACCTGAAGGTTTCCAGTTCTGCCAGCACTCTCCCACCCAACCCCCAGAAACAGACAT
TCCATTGCTGTGGGCCACGGACAGGCAGAAGGAAGCACCTCCTCATGGCAGAGGCCTACC
CAGGAGAAACCCAAGGGAAGGCACTACTGGGCTGGCCCCTCTCTGCCAAGGCCATATTCT
TTTTTTTTTTTTGAGGCCAGTTTCACTCTGTCTCCCAGACTGGAGTGCAGGGGCACAATC
TCGGCTCACTTCGACCTCTGCCTCCCCAGTTCAAGTGATTCTCCTGCCTCAGTCTCCTGA`,
    organism: 'Homo sapiens',
    cutoff: 'curated',
    evalue: 0.001,
  };

  search: any = {};
  organisms: any[] = [];

  loading: boolean;

  @ViewChild('sequenceInput', { static: false }) sequenceInput;

  ngOnInit() {
    this.getAssemblies();
    this.onReset();
  }

  getAssemblies() {
    this.dfamapi.getAssemblies().subscribe(data => this.organisms = data);
  }

  onSubmit() {
    if (this.sequenceInput.invalid) {
      return;
    }

    this.loading = true;
    this.dfamapi.postSearch(
      this.search.sequence,
      this.search.organism,
      this.search.cutoff,
      this.search.evalue,
    ).subscribe(result => {
      if (result && result.id) {
        this.router.navigate(['search', 'results', result.id]);
      } else {
        this.loading = false;
        // TODO: Report an error status
      }
    });
  }

  onReset() {
    this.search.sequence = '';
    this.search.organism = 'Homo sapiens';
    this.search.cutoff = 'curated';
    this.search.evalue = 0.001;
  }

  onExample() {
    this.search.sequence = SearchSequenceComponent.example.sequence;
    this.search.organism = SearchSequenceComponent.example.organism;
    this.search.cutoff = SearchSequenceComponent.example.cutoff;
    this.search.evalue = SearchSequenceComponent.example.evalue;
  }
}
