collection @tasks

attributes :id,:title,:description

node(:startsAt){|s| s.startsAt.to_f}
node(:endsAt){|s| s.endsAt.to_f}
node(:type){|s| "info"}