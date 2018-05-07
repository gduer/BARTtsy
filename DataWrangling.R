library(lubridate)
library(rjson)

data2017 <- read.csv("~/GitHub/CPLN692/CPLN692-Final/Data/date-hour-soo-dest-2017.csv", header=FALSE)
date_table <- read.csv("~/GitHub/CPLN692/CPLN692-Final/Data/dat_table.csv")

colnames(data2017) <- c('Date', 'Hour', 'Origin', "Dest", "Count")

date_table$Date <- mdy(date_table$Date)
data2017$Date <- ymd(data2017$Date)

class(data2017$Date)
class(date_table$Date)

data_w_days <- merge(data2017, date_table, by="Date") 
data_w_days_agg <- aggregate(Count~Day+Hour+Origin+Dest, data_w_days, mean)

data_w_days_agg <- data_w_days_agg[data_w_days_agg$Origin != data_w_days_agg$Dest,]

data_w_days_agg$Count <- as.integer(data_w_days_agg$Count)

data_w_days_agg <- data_w_days_agg[! data_w_days_agg$Hour %in% c(1,2,3),]
Monday_data <- data_w_days_agg[data_w_days_agg$Day == 'Monday',]


we <- c('Saturday','Sunday')

data_w_days_agg$Weekpart <- ifelse(data_w_days_agg$Day %in% c('Saturday','Sunday'),'Weekend','Weekday')
data_w_days_agg$daypart <- ifelse(data_w_days_agg$Hour %in% c(4,5,6),'earlyMorning', data_w_days_agg$daypart)
data_w_days_agg$daypart <- ifelse(data_w_days_agg$Hour %in% c(7,8,9,10),'morningPeak', data_w_days_agg$daypart)                       
data_w_days_agg$daypart <- ifelse(data_w_days_agg$Hour %in% c(11,12,13,14,15,16),'midDay', data_w_days_agg$daypart)
data_w_days_agg$daypart <- ifelse(data_w_days_agg$Hour %in% c(17,18,19,20), 'eveningPeak', data_w_days_agg$daypart)
data_w_days_agg$daypart <- ifelse(data_w_days_agg$Hour %in% c(21,22,23,0), 'night', data_w_days_agg$daypart)

data_agg <- aggregate(Count~daypart+Weekpart+Origin+Dest, data_w_days_agg, mean)

data_agg$Count <- as.integer(data_agg$Count)

data_agg$Name <- ifelse(data_agg$Origin == '16TH',"16TH STREET & MISSION",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == '19TH',"19TH STREET/OAKLAND",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == '24TH',"24TH STREET & MISSION",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'ASHB',"ASHBY",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'BALB',"BALBOA PARK",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'BAYF',"BAY FAIR",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'CAST',"CASTRO VALLEY",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'CIVC',"CIVIC CENTER/ UN PLAZA",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'COLM',"COLMA",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'COLS',"COLISEUM/OAKLAND AIRPORT (OAK)",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'CONC',"CONCORD",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'DALY',"DALY CITY",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'DBRK',"DOWNTOWN BERKELEY",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'DELN',"EL CERRITO DEL NORTE",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'DUBL',"DUBLIN/PLEASANTON",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'EMBR',"EMBARCADERO",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'FRMT',"FREMONT",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'FTVL',"FRUITVALE",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'GLEN',"GLEN PARK",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'HAYW',"HAYWARD",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'LAFY',"LAFAYETTE",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'LAKE',"LAKE MERRITT",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'MCAR',"MACARTHUR",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'MLBR',"MILLBRAE",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'MONT',"MONTGOMERY STREET",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'NBRK',"NORTH BERKELEY",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'NCON',"NORTH CONCORD/MARTINEZ",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'ORIN',"ORINDA",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'PHIL',"PLEASANT HILL/CONTRA COSTA CEN",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'PITT',"PITTSBURG/BAY POINT",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'PLZA',"EL CERRITO PLAZA",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'POWL',"POWELL STREET",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'RICH',"RICHMOND",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'ROCK',"ROCKRIDGE",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'SANL',"SAN LEANDRO",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'SBRN',"SAN BRUNO",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'SFIA',"SFO INTERNATIONAL AIRPORT",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'SHAY',"SOUTH HAYWARD",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'SSAN',"SOUTH SAN FRANCISCO",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'UCTY',"UNION CITY",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'WCRK',"WALNUT CREEK",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'WDUB',"WEST DUBLIN/PLEASANTON",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'WOAK',"WEST OAKLAND",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == '12TH',"12TH ST/OAKLAND CITY CENTER",data_agg$Name)

data_agg$Name <- ifelse(data_agg$Origin == 'WSPR',"16TH STREET & MISSION",data_agg$Name)
data_agg$Name <- ifelse(data_agg$Origin == 'OAKL',"16TH STREET & MISSION",data_agg$Name)

data_agg <- data_agg[data_agg$Dest != 'WSPR',]
data_agg <- data_agg[data_agg$Dest != 'OAKL',]









bartData <- toJSON( data_w_days_agg )




save(bartData, file="bartData.JSON")

write.csv(data_w_days_agg, "bartData.csv")
