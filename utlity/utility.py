from datetime import datetime


def format_day_month_year(timestamp):
    date_time_object = datetime.strptime(timestamp, '%B %d, %Y at 12:00:00 AM UTC+5:30')
    return print("{0} {1}, {2}".format(date_time_object.day, date_time_object.month, date_time_object.year))
