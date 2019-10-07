export class Model {
    category;
    id;
    name: String;
    PC_part_name: string;
    pcpart: Object;
    comments = [];
    vendorPrice = [];
    vendorDetails: Object;
    logged_in = 'false';
    load_for_comment: boolean;
    positive: number;
    negative: number;
    isShowChart: boolean = false;
    title = 'Analysis results of feedback';
    type = 'PieChart';
    columnNames = ['Browser', 'Percentage'];
    options = {
    };
    width = 550;
    height = 400;
}